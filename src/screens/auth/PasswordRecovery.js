import React, { useState } from 'react';

import { Box, HStack, Alert as NVAlert, ScrollView, Text, VStack, Collapse, FormControl, Heading, CloseIcon, IconButton, Button } from 'native-base';
import { evaluateResponseError, validateEmail } from '../../utils/validations';
import { Alert, Image } from 'react-native';
import httpClient from '../../config/httpClient';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import MATextInput from '../../components/MATextInput';

const PasswordRecovery = ({ navigation }) => {



    const [data, setData] = useState({
        loading: false,
        message: null,
        email: ""
    });

    const [errorInput, setErrorInput] = useState(null);



    const onSubmit = async () => {

        if (data.email === "" || validateEmail(data.email) === false) {

            setErrorInput("Debe ingresar un correo válido")
        } else {
            setData({ ...data, loading: true });
            try {


                let res = await httpClient.post("/accounts/forgot", {
                    email: data.email
                })


                if (res.data.status === "success") {
                    setData({ ...data, email: "", message: res.data.message, loading: false });


                } else {
                    Alert.alert("Error", res.data.message, [
                        {
                            text: "OK",
                            style: "cancel",
                            onPress: () => {

                                setData({ ...data, loading: false });

                            }
                        }
                    ]);
                }

            } catch (error) {

                const { title, body } = evaluateResponseError(error);
                Alert.alert(title, body, [
                    {
                        text: "OK",
                        style: "cancel",
                        onPress: () => {

                            setData({ ...data, loading: false });

                        }
                    }
                ]);
            }
        }



    }

    return (
        <ScrollView
            _contentContainerStyle={{
                minW: "72",
                backgroundColor: "#26b99a"
            }}
            style={{ backgroundColor: "#FFF" }}
        >
            <Box flex="1" backgroundColor="#26b99a">

                <HStack justifyContent="space-between" mb="5" alignItems="flex-start" pt="3">
                    <Icon name="arrow-left" type="material-community" color="#fff" containerStyle={{ marginLeft: 15, marginTop: 5 }} onPress={() => { navigation.goBack() }} />

                    <Box flexDirection="column" alignItems="flex-start" pl="3" flex="1" ml="1">
                        <Text fontSize="xl" fontWeight="bold" color="gray.100" >Recuperar contraseña</Text>
                    </Box>


                </HStack>

                <Box backgroundColor="white" borderTopRadius="3xl" p="5">


                    <Box justifyContent={"center"} alignItems={"center"} mt="1">
                        <Image
                            source={require("../../assets/img/logoLogin.png")}
                            resizeMode="contain"
                            style={{ width: 150, height: 150 }}

                        />
                    </Box>

                    <Heading
                        mt="5"
                        size="md"
                        textAlign="center"
                        fontWeight="normal"
                        color="#26b99a"
                        _dark={{
                            color: "warmGray.50",
                        }}
                        mb="3"
                    >
                        Ingrese el correo con el que se registró en maloca
                    </Heading>
                    <Box px={"4"}>
                        <FormControl mt="5" >
                            <MATextInput
                                variant="underlined"
                                label="Correo electrónico"
                                Left={<Icon
                                    name="email-outline"
                                    type="material-community"
                                />}
                                error={errorInput}
                                onChangeText={(event) => {
                                    setData({ ...data, email: event })
                                }}
                                onBlur={(event) => {
                                    if (data.email === "" || validateEmail(data.email) === false) {
                                        setErrorInput("Debe ingresar un correo válido")
                                    } else {
                                        setErrorInput(null)
                                    }
                                }}
                            />

                        </FormControl>



                    </Box>

                    <VStack>
                        <Collapse isOpen={data.message != null} mt="5">
                            <NVAlert w="100%" status="success">
                                <VStack space={1} flexShrink={1} w="100%">
                                    <HStack
                                        flexShrink={1}
                                        space={2}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <HStack flexShrink={1} space={2} alignItems="center">
                                            <NVAlert.Icon />
                                            <Text
                                                fontSize="md"
                                                fontWeight="medium"
                                                _dark={{
                                                    color: "coolGray.800",
                                                }}
                                            >
                                                ¡Éxito!
                                            </Text>
                                        </HStack>
                                        <IconButton
                                            variant="unstyled"
                                            icon={<CloseIcon size="3" color="coolGray.600" />}
                                            onPress={() => { setData({ ...data, message: null }) }}
                                        />
                                    </HStack>
                                    {data.message !== null ? <Box
                                        pl="6"
                                        _dark={{
                                            _text: {
                                                color: "coolGray.600",
                                            },
                                        }}
                                    >
                                        {data.message}
                                    </Box> : null}
                                </VStack>
                            </NVAlert>
                        </Collapse>
                        <Button mt="8" background="#26b99a" isLoading={data.loading} borderRadius="10" onPress={() => {

                            if (!data.loading) {
                                onSubmit()
                            }
                        }}>
                            Iniciar sesión
                        </Button>
                    </VStack>
                </Box>
            </Box>
        </ScrollView>
    );
}


export default PasswordRecovery;