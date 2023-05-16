import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Video from "../screens/Video";


const Stack = createNativeStackNavigator();

/** Exporta la pila de pilas de los diferentes módulos de la aplicacion,
 * es decir las pantallas de los modulos que no estan en el tabbar, se incluyen en
 * esta pila, de manera que la mayoría de modulos se encuentra dentro del stack de inicio
 * 
 */
export default function VideoStack() {

    return (

        <Stack.Navigator
            headerMode="none"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="video"
                component={Video}
            />

        </Stack.Navigator>
    );
}
