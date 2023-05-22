import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import colors from '../../constants/colors';


import ImageViewer from '../screens/ImageViewer';

import StartStack from './StartStack';
import ProfileStack from './ProfileStack';
import ProjectStack from './ProjectStack';
import PodcastStack from './PodcastStack';


/**Retorna una pila que incluye una pila de notificaciones, un pantalla para la seleccion
 * de administraciones y el bottombar
 * 
 * Esto se hace con el fin de evitar que el bottom bar aparezca en pantallas donde no se necesita
 * 
 * @returns 
 */

const UserNavigation = () => {
    const Stack = createNativeStackNavigator();


    return (<Stack.Navigator
        headerMode="none"
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name="Home" component={HomeTabs} />
    </Stack.Navigator>);
}


/**Renderiza el BottomTabBar
 * con las tabs de navegacion para un administrador
 * (se les asigna un label y un icon)
 * 
 * @returns 
 */

const HomeTabs = () => {

    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                
                tabBarActiveTintColor: colors.PRIMARY1,
               
                headerTitle: ({ color }) => UserTitle(route, color),
                headerShown: false,
                tabBarLabel: ({ color }) => UserTitle(route, color),
                // tabBarLabelStyle:{ fontSize: 15 },
                tabBarLabelPosition: "below-icon",
                tabBarIcon: ({ color }) => ScreenOptions(route, color),
                tabBarHideOnKeyboard: true
            })}
        >
            <Tab.Screen name="startStack" component={StartStack} />
            <Tab.Screen name="profileStack" component={ ProfileStack} />
            <Tab.Screen name="projectStack" component={ ProjectStack} />
            <Tab.Screen name="podcastStack" component={PodcastStack} />
        </Tab.Navigator>
    )
}

function ScreenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case "startStack":
            iconName = "home";
            break;
        case "videoStack":
            iconName = "video-box";
            break;
        case "profileStack":
            iconName = "account-outline";
            break;
        case "projectStack":
            iconName = "microscope";
            break;
        case "podcastStack":
            iconName = "account-voice";
            break;
        case "bookingStack":
            iconName = "ticket";
            break;
        default:
            break;
    }

    return (
        <Icon type="material-community" name={iconName} size={26} color={color} />
    );
}
function UserTitle(route, color) {
    let name;

    switch (route.name) {
        case "startStack":
            name = "Inicio";
            break;
        case "videoStack":
            name = "Videos";
            break;
        case "profileStack":
            name = "Perfil";
            break;
        case "projectStack":
            name = "Proyectos";
            break;
        case "podcastStack":
            name = "Podcast";
            break;
        case "bookingStack":
            name = "Reservas";
            break;
        case "events":
            name = "Eventos";
            break;
        case "news":
            name = "Noticias";
            break;
        case "pqrsStack":
            name = "PQRS";
            break;
        case "parking":
            name = "Parqueadero";
            break;
        case "vehicles":
            name = "Vehículos";
            break;
        case "directory":
            name = "Directorio";
            break;
        case "documents":
            name = "Documentos";
            break;
        case "correspondenceManager":
            name = "Correspondencia";
            break;
        case "pets":
            name = "Mascotas";
            break;
        case "vehicles":
            name = "Vehículos";
            break;
        case "marketplace":
            name = "Marketplace";
            break;
        case "accessControl":
            name = "Visitantes"
            break;
        default:
            break;
    }

    return <Text style={{ fontSize: 12, color }}>{name}</Text>;
}

export default UserNavigation;