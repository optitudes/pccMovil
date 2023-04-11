import React, { useContext, useEffect } from 'react';


import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import AdminNavigation from "../admin/navigations/AdminNavigation";
import AuthStack from "./AuthStack";
import authContext from '../context/authContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Alert, Dimensions, Linking, Platform, TouchableHighlight, Vibration } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
import httpClient from '../config/httpClient';
import { evaluateResponseError } from '../utils/validations';
import notificationContext from '../context/notificationContext';
import { Box, HStack, Text, useToast, VStack } from 'native-base';
import SplashScreen from 'react-native-splash-screen'
import WorkGroupNavigation from './../workGroup/navigations/WorkGroupNavigation';


/**Navegacion core de la aplicacion
 * 
 * En este módulo se gestiona:
 * Spinner de carga inicial
 * el enrutamiento para todos los roles (https://reactnavigation.org/)
 * las notificaciones push (https://rnfirebase.io/) cloud messaging
 * Deep linking
 * 
 * 
 * @param {*} param0 
 * 
 * Exporta la navegacion de la apliación movil
 */

const Navigation = ({ isCheckingForUpdate }) => {

    const { authenticated, initialLoading, initialMessage, getUserInSession, currentManagement } = useContext(authContext);
    const { markAsReaded, error, incrementNotificationCounter } = useContext(notificationContext);
    const navigationRef = useNavigationContainerRef();

    const toast = useToast()



    useEffect(() => {
        let mounted = true;
        if (mounted && error) {
            Alert.alert(error.title, error.body, [
                {
                    text: "OK",
                    style: "cancel"
                },
            ]);
        }
        return () => {
            mounted = false;
        }
    }, [error])


    useEffect(() => {

        getUserInSession();
    }, []);

    useEffect(() => {
        if (initialMessage) {
            Alert.alert(initialMessage.title, initialMessage.body);
        }
        if (currentManagement && navigationRef.isReady()) {

            navigationRef.resetRoot({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    }, [initialMessage, currentManagement]);

    useEffect(() => {

        requestUserPermission();

        if (authenticated) {

            // Get the device token
            messaging()
                .getToken()
                .then(token => {
                    return saveTokenToDatabase(token);
                });


            // Listen to whether the token changes
            return messaging().onTokenRefresh(token => {
                saveTokenToDatabase(token);
            });
        }
    }, [authenticated]);




    if (initialLoading || isCheckingForUpdate !== "Iniciando...") {
        return <LoadingSpinner isVisible={true} text={isCheckingForUpdate} />
    } else {

        const linkingConfig = {
            prefixes: ['malocaadmin://'],
            config: {
                screens: {
                    notificationStack: {
                        screens: {
                            bookingDetail: 'booking/:idBooking',
                            pqrsDetail: 'pqrs/:idPQRS',
                            feeDetail: 'fees/:id_cuota_residencia',
                            taskDetail: 'task/:taskId'
                        }
                    },
                    startStack: {
                        screens: {
                            users: {
                                screens: {
                                    usersList: 'user/:accessState'
                                }
                            }
                        },
                    }
                }
            },
            async getInitialURL() {



                // Check if app was opened from a deep link
                const url = await Linking.getInitialURL();

                if (url != null) {
                    return url;
                }

                // Check if there is an initial firebase notification
                const message = await messaging().getInitialNotification();
                let data = ""
                if (message) {

                    data = message.data;

                    //Se valida que la notificacion sea  para la administracion seleccionada
                    let managementInfo = await EncryptedStorage.getItem("managementInfo");
                    let withAccess = false;
                    if (managementInfo) {

                        let idManagement = JSON.parse(managementInfo).idManagement;

                        if (idManagement === parseInt(data.id_administracion)) {
                            withAccess = true;
                        }
                    } else {
                        //se guarda para navegar despues de que se seleccione una administración
                        await EncryptedStorage.setItem("lastNotification", JSON.stringify(data));
                    }


                    if (withAccess) {

                        //1 reservas
                        //2 son usuarios
                        //3 pqrs
                        switch (data.moduloObjetivo) {
                            case "1":

                                markAsReaded("1", data.id_reserva);

                                return "malocaadmin://booking/" + data.id_reserva;
                            case "2":
                                markAsReaded("2", data.id_usuario);
                                return "malocaadmin://user/Pendiente";
                            case "3":
                                markAsReaded("3", data.id_pqrs);

                                return "malocaadmin://pqrs/" + data.id_pqrs;
                            case "5":
                                markAsReaded("5", data.id_cuota_residencia);

                                return "malocaadmin://fees/" + data.id_cuota_residencia;

                            default:
                                return null;
                        }
                    } else {
                        Alert.alert("Información", "Esta notificación va dirigida a otra administración, si usted esta vinculado a otra administración realice el cambio para poder visualizarla", [
                            {
                                text: "OK",
                                style: "cancel"
                            },
                        ]);
                    }
                }
                // Get the `url` property from the notification which corresponds to a screen
                // This property needs to be set on the notification payload when sending it
                return null;
            }, subscribe(listener) {
                // const onReceiveURL = async ({ url }) => {

                //     if (url !== null) {

                //     }
                // };
                // // Listen to incoming links from deep linking
                // Linking.addEventListener('url', onReceiveURL);


                // Captura si se recibe una notificacion mientras la aplicacón está en primer plano

                const foregroundMessageReceived = messaging().onMessage(async remoteMessage => {

                    const data = remoteMessage.data;
                    let managementInfo = await EncryptedStorage.getItem("managementInfo");
                    incrementNotificationCounter()

                    const PATTERN = [
                        200, 200, 200, 200
                    ];
                    Vibration.vibrate(PATTERN)
                    toast.show({
                        placement: "top",
                        render: () => {
                            return (


                                <TouchableHighlight style={{ borderRadius: 15, borderWidth: 0.7, backgroundColor: "#fff", borderColor: "#d4d4d4", width: Dimensions.get("screen").width * 0.9, height: 100, padding: 10 }}
                                    underlayColor={"#e5e5e5"}
                                    onPress={() => {


                                        if (managementInfo) {
                                            let idManagement = JSON.parse(managementInfo).idManagement;
                                            if (idManagement === parseInt(data.id_administracion)) {

                                                toast.closeAll();
                                                let route = null;
                                                switch (data.moduloObjetivo) {
                                                    case "1":
                                                        markAsReaded("1", data.id_reserva);
                                                        route = "malocaadmin://booking/" + data.id_reserva;

                                                        break;
                                                    case "2":

                                                        markAsReaded("2", data.id_usuario);
                                                        route = "malocaadmin://user/Pendiente";

                                                        break;
                                                    case "3":
                                                        markAsReaded("3", data.id_pqrs);
                                                        route = "malocaadmin://pqrs/" + data.id_pqrs;
                                                        break;
                                                    case "5":
                                                        markAsReaded("5", data.id_cuota_residencia);

                                                        return "malocaadmin://fees/" + data.id_cuota_residencia;

                                                    case "5":
                                                        markAsReaded("6", data.id_tarea);

                                                        return "malocaadmin://task/" + data.id_tarea;

                                                    default:
                                                        route = null;
                                                }

                                                listener(route)

                                            } else {
                                                Alert.alert("Información", "Si usted está vinculado a otra administración debe realizar el cambio de residencia para visualizar esta notificación", [
                                                    {
                                                        text: "OK",
                                                        style: "cancel",
                                                    },
                                                ]);
                                            }
                                        }

                                    }}
                                >
                                    <>
                                        <HStack alignItems={"center"}>
                                            <Box width={"5"} borderRadius={"sm"} background={"#26b99a"} height={"5"}></Box>
                                            <Text ml="2" fontSize={"xs"}>Maloca</Text>

                                        </HStack>
                                        <VStack mt="3">
                                            <Text fontWeight={"bold"} numberOfLines={1} fontSize={"md"}>{remoteMessage.notification.title}</Text>
                                            <Text numberOfLines={1}>{remoteMessage.notification.body}</Text>

                                        </VStack>
                                    </>
                                </TouchableHighlight>

                            )
                        }
                    })

                });


                //  Captura cuando se le da tap a una notificacion en la app background
                const backgroundMessageReceived = messaging().onNotificationOpenedApp(async (remoteMessage) => {

                    const data = remoteMessage.data;

                    let managementInfo = await EncryptedStorage.getItem("managementInfo");

                    if (managementInfo) {

                        let idManagement = JSON.parse(managementInfo).idManagement;

                        if (idManagement === parseInt(data.id_administracion)) {

                            let route = null;
                            switch (data.moduloObjetivo) {
                                case "1":
                                    markAsReaded("1", data.id_reserva);
                                    route = "malocaadmin://booking/" + data.id_reserva;
                                    break;
                                case "2":

                                    markAsReaded("2", data.id_usuario);
                                    route = "malocaadmin://user/Pendiente";

                                    break;
                                case "3":
                                    markAsReaded("3", data.id_pqrs);
                                    route = "malocaadmin://pqrs/" + data.id_pqrs;
                                    break;
                                case "5":
                                    markAsReaded("5", data.id_cuota_residencia);

                                    route = "malocaadmin://fees/" + data.id_cuota_residencia;
                                    break;
                                default:
                                    route = null;
                            }
                            listener(route);
                        } else {
                            Alert.alert("Información", "Si usted está vinculado a otra administración debe realizar el cambio de residencia para visualizar esta notificación", [
                                {
                                    text: "OK",
                                    style: "cancel",
                                },
                            ]);
                        }
                    }

                });

                return () => {
                    // Clean up the event listeners
                    foregroundMessageReceived();
                    backgroundMessageReceived();
                };
            },

        }


        return (
            <NavigationContainer ref={navigationRef} linking={linkingConfig} onReady={() => {
                if (Platform.OS === "android") {
                    SplashScreen.hide();
                }
            }} >

                {/* Switch para cada rol */}
                {authenticated ? <RoleSwitcher /> : <AuthStack />
                }
            </NavigationContainer >
        )
    }
}


/**Retorna la navegación para determinado rol
 * 
 * @returns 
 */
const RoleSwitcher = () => {
    const { userInfo } = useContext(authContext);

    if (userInfo) {

        if (userInfo.userType.toString() === "1") {
            return <AdminNavigation />
        } else {
            return <WorkGroupNavigation />
        }
    }

    return <Text mt={"5"}>Cargando...</Text>
}


/**Permite guardar el token en BD 
 * 
 * @param {*} token 
 */
async function saveTokenToDatabase(token) {

    try {
        const res = await httpClient.post("/notifications/register", {
            token,
            so: Platform.OS
        })

        if (res.data.status !== "success") {
            Alert.alert("Error", res.data.message, [
                {
                    text: "OK",
                    style: "cancel",
                },
            ]);
        } else {
            // console.log("REISTRO_TOKEN", res.data.message)
        }
    } catch (error) {
        const { title, body } = evaluateResponseError(error);
        Alert.alert(title, body, [
            {
                text: "OK",
                style: "cancel",
            },
        ]);

    }


}
async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //     console.log('Authorization status:', authStatus);
    // }
}
export default Navigation;