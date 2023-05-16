import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "../screens/Start";


const Stack = createNativeStackNavigator();

/** Exporta la pila de pilas de los diferentes módulos de la aplicacion,
 * es decir las pantallas de los modulos que no estan en el tabbar, se incluyen en
 * esta pila, de manera que la mayoría de modulos se encuentra dentro del stack de inicio
 * 
 */
export default function StartStack() {

    return (

        <Stack.Navigator
            headerMode="none"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="start"
                component={Start}
            />

        </Stack.Navigator>
    );
}
