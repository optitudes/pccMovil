import React, { useReducer } from 'react';
import notificationContext from './notificationContext';
import notificationReducer from './notificationReducer';

import httpClient from "../config/httpClient"

import {
    INCREMENT_NOTIFICATION,
    NOTIFICATIONS_MESSAGE,
    READ_ERROR,
    NOTIFICATIONS_COUNTER,
} from './types';


const { evaluateResponseError } = require("../utils/validations");

/**Módulo que permite gestionar las notificaciones (no las push)
 * 
 * @param {*} props 
 * Exporta funciones que permiten:
 * obtener las notificaciones sin leer
 * marcar una notificación como leída
 * incrementar el contador de notificaciones
 * Manejar mensajes de error
 * 
 * Exporta
 * el numero de notificaciones sin leer
 * el listado de notificaciones
 * 
 */
const NotificationState = props => {

    const initialState = {
        error: null,
        loadingNotifications: false,
        notifications: [],
        notificationCounter: 0,
        showIncomingNotification: false,
        cancelledCall: false,
    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(notificationReducer, initialState);


    const getUnread = async () => {
        try {
            const res = await httpClient.get("/notifications/unread");

            if (res.data.status === "success") {
                dispatch({
                    type: NOTIFICATIONS_COUNTER, payload:
                        res.data.data
                });

            }
        } catch (err) {
            console.log(err);


            // client received an error response (5xx, 4xx)
            const { title, body } = evaluateResponseError(err);

            dispatch({
                type: NOTIFICATIONS_MESSAGE, payload:
                {
                    title: title,
                    body: body,
                    type: "alert"
                }
            });
        }

    }


    /**Marca una notificacion como leída
     * 
     * @param {*} idMmodulo  si es reserva, pqrs, o usuario
     * @param {*} idAssociated el id correspondiente
     */
    const markAsReaded = async (idModule, idAssociated) => {

        try {
            let res = await httpClient.put("/notifications/" + idModule + "/" + idAssociated);

            if (res.data.status !== "success") {
                dispatch({
                    type: READ_ERROR, payload:
                    {
                        title: "Error",
                        body: res.data.message,
                        type: "alert"
                    }
                });
            } else {
                getUnread()
            }
        } catch (error) {


            const { title, body } = evaluateResponseError(error);
            dispatch({
                type: READ_ERROR, payload:
                {
                    title: title,
                    body: body,
                    type: "alert"
                }
            });
        }

    }

    const handleErrorMessage = async () => {
        dispatch({
            type: READ_ERROR, payload: null
        });
    }

    const incrementNotificationCounter = async () => {
        dispatch({
            type: INCREMENT_NOTIFICATION
        });
    }


    return (
        <notificationContext.Provider value={{
            notifications: state.notifications,
            notificationCounter: state.notificationCounter,
            error: state.error,
            loadingNotifications: state.loadingNotifications,
            cancelledCall: state.cancelledCall,
            showIncomingNotification: state.showIncomingNotification,
            markAsReaded,
            handleErrorMessage,
            getUnread,
            incrementNotificationCounter,
        }}>
            {props.children}
        </notificationContext.Provider>

    );
}
export default NotificationState;