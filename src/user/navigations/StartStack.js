import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "../screens/Start";
import SearchProject from "../screens/project/SearchProject";
import SearchPicture from "../screens/picture/SearchPicture";
import SearchVideo from "../screens/video/SearchVideo"
import SearchPodcast from "../screens/podcast/SearchPodcast";


import VideoDetail from "../screens/video/VideoDetail"
import PictureDetail from "../screens/picture/PictureDetail"


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
            <Stack.Screen
                name="searchProject"
                component={SearchProject}
            />
            <Stack.Screen
                name="searchPicture"
                component={SearchPicture}
            />
            <Stack.Screen
                name="searchVideo"
                component={SearchVideo}
            />
            <Stack.Screen
                name="searchPodcast"
                component={SearchPodcast}
            />
            <Stack.Screen
                name="videoDetail"
                component={VideoDetail}
            />
             <Stack.Screen
                name="pictureDetail"
                component={PictureDetail}
            /> 

        </Stack.Navigator>
    );
}
