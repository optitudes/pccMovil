import React, { useState, useContext } from 'react';

import { Box, FormControl, Heading, VStack, Input, Link, HStack, Text, Button, ScrollView, Collapse, Alert, IconButton, CloseIcon } from 'native-base';
import authContext from '../../context/authContext';
import MATextInput from '../../components/MATextInput';
//import { Icon } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import colors from "../../constants/colors";
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Image, KeyboardAvoidingView, Linking, Platform } from 'react-native';
import { validateEmail } from '../../utils/validations';

const Login = ({ navigation }) => {
    const { login, message, loading, handleMessage } = useContext(authContext);

    const [credentials, setCredentials] = useState({

        email: "",
        password: ""

    });
    const [errors, setErrors] = useState({
        email: null,
        password: null
    });

    const onSubmit = () => {

        if (!loading) {
            if (credentials.email === "" || validateEmail(credentials.email) === false) {
                setErrors({ ...errors, email: "Debe ingresar un correo válido" })
            } else if (credentials.password === "") {
                setErrors({ ...errors, password: "Debe ingresar una contraseña" })
            } else {
                login(credentials.email, credentials.password)
            }

        }
    }

    return (
        <ScrollView
            _contentContainerStyle={{
                minW: "72",
                backgroundColor: colors.SECUNDARY1 
            }}

            bounces={false}
            style={{ backgroundColor: colors.SECUNDARY1 }}
        >
            <VStack background={colors.PRIMARY1}>


                <VStack padding="3"
                    justifyContent="flex-start"
                    flex="1"
                    borderTopRadius="3xl"
                    background="white"
                >
                    
                    <Box safeArea p="3" flex="1" >
                        <Box justifyContent={"center"} alignItems={"center"} mt="1">
                            <Image
                                source={require("../../assets/img/logoLogin.png")}
                                resizeMode="contain"
                                style={{ width: 150, height: 150 }}

                            />
                        </Box>
                        <VStack space={3} mt="8">
                            <MATextInput
                                variant="underlined"
                                label="Correo electrónico"
                                placeholder="Ingrese su correo"
                                Left= {<Icon
                                    name="email-outline"
                                    type="material-community"
                                />}
                                error={errors.email}
                                onChangeText={(event) => {
                                    setCredentials({ ...credentials, email: event.trim() })

                                }}
                                onBlur={(event) => {
                                    if (credentials.email === "" || validateEmail(credentials.email) === false) {
                                        setErrors({ ...errors, email: "Debe ingresar un correo válido" })
                                    } else {
                                        setErrors({ ...errors, email: null })
                                    }
                                }}
                            />
                            <FormControl mt="5">
                                <MATextInput
                                    variant="underlined"
                                    label="Contraseña"
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    error={errors.password}
                                    Left={
                                        <Icon name="lock-outline" type="material-community" />
                                    }
                                    onChangeText={(event) => { setCredentials({ ...credentials, password: event.trim() }) }}
                                    onBlur={(event) => {

                                        if (credentials.password === "") {
                                            setErrors({ ...errors, password: "Debe ingresar una contraseña" })
                                        } else {
                                            setErrors({ ...errors, password: null })

                                        }

                                    }}
                                />

                            </FormControl>

                            <Collapse isOpen={message != null} mt="5">
                                <Alert w="100%" status="error">
                                    <VStack space={1} flexShrink={1} w="100%">
                                        <HStack
                                            flexShrink={1}
                                            space={2}
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <HStack flexShrink={1} space={2} alignItems="center">
                                                <Alert.Icon />
                                                <Text
                                                    fontSize="md"
                                                    fontWeight="medium"
                                                    _dark={{
                                                        color: "coolGray.800",
                                                    }}
                                                >
                                                    Ha ocurrido un error!
                                                </Text>
                                            </HStack>
                                            <IconButton
                                                variant="unstyled"
                                                icon={<CloseIcon size="3" color="coolGray.600" />}
                                                onPress={() => console.log('...')}
                                            />
                                        </HStack>
                                        {message !== null ? <Box
                                            pl="6"
                                            _dark={{
                                                _text: {
                                                    color: "coolGray.600",
                                                },
                                            }}
                                        >
                                            {message.body}
                                        </Box> : null}
                                    </VStack>
                                </Alert>
                            </Collapse>
                            <Button mt="8" background={colors.PRIMARY1} isLoading={loading} borderRadius="10" onPress={() => onSubmit()}>
                                Iniciar sesión
                            </Button>
                            <Link
                                    _text={{
                                        textAlign: "center",
                                        fontSize: "xs",
                                        fontWeight: "500",
                                        color: "indigo.500",
                                    }}

                                    alignSelf="center"
                                    mt="5"
                                    onPress={() => navigation.navigate("passwordRecovery")}
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                                
                                <Link
                                    _text={{
                                        textAlign: "center",
                                        fontSize: "xs",
                                        fontWeight: "500",
                                        color: "indigo.500",
                                    }}

                                    alignSelf="center"
                                    mt="5"
                                    onPress={() => navigation.navigate("passwordRecovery")}
                                >
                                    <Text style={{color: "black"}}>No tienes una cuenta? </Text>Registrarse
                                </Link>
                                
                        </VStack>

                        <VStack alignItems={"center"} mt="10">

                            <Text textAlign={"center"}>
                                <Text
                                    onPress={() => {
                                        Linking.openURL(
                                            `https://pcc.co/main/tratamiento_datos`
                                        );
                                    }}
                                    style={{ textDecorationLine: "underline", color: "gray" }}
                                >
                                    Políticas de tratamiento de datos
                                </Text>
                                <Text style={{ textDecorationLine: "none", color: "gray" }}>
                                    {" "}
                                    y{" "}
                                </Text>
                                <Text
                                    onPress={() => {
                                        Linking.openURL(
                                            `https://pcc.co//main/terminos_servicio`
                                        );
                                    }}
                                    style={{ textDecorationLine: "underline", color: "gray" }}
                                >
                                    términos del servicio
                                </Text>
                            </Text>
                            <Text style={{ marginTop: 15, color: "gray" }}>
                                &copy; {new Date().getFullYear()} App, Todos los derechos reservados.
                            </Text>
                        </VStack>
                    </Box>
                </VStack>
            </VStack>
        </ScrollView>
    );
}


export default Login;