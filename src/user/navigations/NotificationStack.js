import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationsList from '../screens/notifications/NotificationsList';
import PQRSDetail from '../screens/pqrs/PQRSDetail';
import BookingDetail from '../screens/booking/BookingDetail';
import PQRSSolve from '../screens/pqrs/PQRSSolve';
import FeeDetail from '../screens/residences/FeeDetail';
import PaymentReviewConstancy from '../screens/residences/PaymentReviewConstancy';
import PaymentPartAdd from '../screens/residences/PaymentPartAdd';
import PaymentTotalAdd from '../screens/residences/PaymentTotalAdd';
import TaskDetail from './../../screens/tasks/TaskDetail';
import TaskEdit from '../../screens/tasks/TaskEdit';

const Stack = createNativeStackNavigator();

/** Exporta la pila de componentes asociados a la gestión de las notificaciones ara el usuario "administrador"
 * Este modulo adicionalmente contiene las pantallas a las que se puede navegar al dar tap
 * sobre una notificacion push.
 * 
 * Si se quiere agregar otro  tipo de notificacion push tener en cuenta que se debe agregar la pantalla
 * a la que se pude navegar al darle tap
 * 
 * tambien se debe agregar las pantallas a las que se puede navegar desde esa pantalla inicial
 * 
 */
export default function NotificationStack() {

    return (

        <Stack.Navigator
            headerMode="none"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="notifications"
                component={NotificationsList}
            />

            <Stack.Screen
                name="pqrsDetail"
                component={PQRSDetail}
            />
            <Stack.Screen
                name="bookingDetail"
                component={BookingDetail}
            />
            <Stack.Screen
                name="pqrsSolve"
                component={PQRSSolve}
            />
            <Stack.Screen
                name="feeDetail"
                component={FeeDetail}
            />
            <Stack.Screen
                name="paymentTotalAdd"
                component={PaymentTotalAdd}
            />

            <Stack.Screen
                name="paymentPartAdd"
                component={PaymentPartAdd}
            />
            <Stack.Screen
                name="paymentReviewConstancy"
                component={PaymentReviewConstancy}
            />

            <Stack.Screen
                name="taskDetail"
                component={TaskDetail}
            />
            <Stack.Screen
                name="taskEdit"
                component={TaskEdit}
            />
        </Stack.Navigator>
    );
}

