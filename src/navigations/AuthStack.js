import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import PasswordRecovery from "../screens/auth/PasswordRecovery";
import { Text } from "react-native-svg";

const Stack = createNativeStackNavigator();

/**Pila de componentes de autenticación
 * 
 * @returns 
 */
export default function AuthStack() {

    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="login"
            detachInactiveScreens={true}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="login"
                component={Login}
            />
            <Stack.Screen
                name="passwordRecovery"
                component={PasswordRecovery}
            />

        </Stack.Navigator>    );
}

