import React, { useContext, useEffect } from 'react';


import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import UserNavigation from "../user/navigations/UserNavigation";
import AuthStack from "./AuthStack";
import authContext from '../context/authContext';
import { Alert, Dimensions, Linking, Platform} from 'react-native';
//import EncryptedStorage from 'react-native-encrypted-storage';
//import httpClient from '../config/httpClient';
//import { evaluateResponseError } from '../utils/validations';
import { Box, HStack, Text, useToast, VStack } from 'native-base';
import SplashScreen from 'react-native-splash-screen'
//import WorkGroupNavigation from './../workGroup/navigations/WorkGroupNavigation';


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

const Navigation = () => {

    const { authenticated, initialLoading, initialMessage, getUserInSession } = useContext(authContext);
    //const { markAsReaded, error, incrementNotificationCounter } = useContext(notificationContext);
    const navigationRef = useNavigationContainerRef();

    const toast = useToast()

    useEffect(() => {
        if (initialMessage) {
            Alert.alert(initialMessage.title, initialMessage.body);
        }
        if ( navigationRef.isReady()) {

            navigationRef.resetRoot({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    }, [initialMessage]);
        return (
            <NavigationContainer ref={navigationRef}  onReady={() => {
                if (Platform.OS === "android") {
                    SplashScreen.hide();
                }
            }} >
                {/* Switch para cada rol */}
                {authenticated ? <UserNavigation /> : <AuthStack />
                }
            </NavigationContainer >
        )
    }
export default Navigation;