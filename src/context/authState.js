import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import EncryptedStorage from 'react-native-encrypted-storage';
import {
    USER_IN_SESSION,
    LOGOUT,
    LOADING,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    MESSAGE,
    ERROR_LOGOUT,
    ERROR_INITIAL,
    INITIAL_LOADING,
    SELECT_MANAGEMENT
} from '../constants/types';

import httpClient from '../config/httpClient';
import authToken from '../config/authToken';

const { evaluateResponseError } = require("../utils/validations");

/**Módulo encargado de la gestion del estado para los datos de la sesión
 * 
 * https://es.reactjs.org/docs/context.html
 * 
 * @param {*} props 
 * 
 * exporta funciones que permiten 
 * iniciar sesión
 * finalizar la sesión
 * obtener el usuario en sesion
 * cambiar entre administraciones
 * y mostrar/ocultar alertas informativas
 * 
 * exporta informacion del usuario y de la administración en sesión 
 */

const AuthState = props => {

    const initialState = {
        authenticated: false,
        message: null,
        loading: false,
        initialLoading: true,
        initialMessage: null,
        userInfo: null,
    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(authReducer, initialState);


    /**Permite autenticar al usuario administrador en la aplicación
     * 
     * @param {*} email 
     * @param {*} password 
     */
    const login = async (email, password) => {

        dispatch({ type: LOADING, payload: true });

        let formattedData = {
            usuario: email,
            clave: password,
        }
        try {

            const res = await httpClient.post("/login", formattedData)

            if (res.data.status === "success") {
                let userData = res.data.data.user_data;
                if (userData.role_id.toString() === ADMINISTRATOR || userData.role_id.toString() === WORK_GROUP) {
                    authToken(res.data.data.access.access_token);
                    // console.log("TOKEN LOGIN",res.data.data.access)
                    await EncryptedStorage.setItem("userToken", res.data.data.access.access_token);

                    dispatch({ type: SUCCESS_LOGIN, payload: res.data.data });
                } else {
                    await EncryptedStorage.clear();
                    dispatch({
                        type: ERROR_LOGIN, payload:
                        {
                            title: "Error",
                            body: "Esta aplicación solo está disponible para administradores y personal de trabajo de conjuntos residenciales",
                            type: "alert"
                        }
                    });
                }
            } else {
                await EncryptedStorage.clear();
                dispatch({
                    type: ERROR_LOGIN, payload:
                    {
                        title: "Error",
                        body: res.data.message,
                        type: "alert"
                    }
                });
            }
        } catch (err) {
            // console.error("LOGIN_ERROR", err.response.data);
            await EncryptedStorage.clear();
            const { title, body } = evaluateResponseError(err);
            dispatch({
                type: ERROR_LOGIN, payload:
                {
                    title: title,
                    body: body,
                    type: "alert"
                }
            });
        }
    }

    /**Función que permite obtener el usuario en sesion
     * 
     */
    const getUserInSession = async () => {
        /*
        dispatch({ type: INITIAL_LOADING, payload: true });

        try {
            let token = await EncryptedStorage.getItem("userToken");
            if (token !== undefined) {

                authToken(token);
                const res = await httpClient.get("/auth/me");

                if (res.data.status) {
                    let userData = res.data.data;
                        dispatch({ type: USER_IN_SESSION, payload: res.data.data });
 
                } else {
                    await EncryptedStorage.clear();
                    dispatch({
                        type: ERROR_LOGIN, payload:
                        {
                            title: "Error",
                            body: "Su sesion ha sufrido un cambio, por favor ingrese nuevamente",
                            type: "alert"
                        }
                    });
                }
            } else {
                dispatch({ type: INITIAL_LOADING, payload: false });
            }
        } catch (err) {
            let res = await EncryptedStorage.getItem("userToken")

            const { title, body, show = true } = evaluateResponseError(err);
            await EncryptedStorage.clear();
            dispatch({
                type: ERROR_INITIAL, payload: show ?
                    {
                        title: title,
                        body: body,
                        type: "alert"
                    } : null
            });
        }
        */
    }

    /**Funcion que permite al usuario cerrar sesion
     * 
     */
    const logout = async () => {
        /*

        dispatch({ type: LOADING, payload: true });
        try {

            await httpClient.post("/auth/logout");
            await EncryptedStorage.clear();
            dispatch({ type: LOGOUT });

        } catch (error) {


            const { title, body } = evaluateResponseError(error);
            dispatch({
                type: ERROR_LOGOUT, payload:
                {
                    title: title,
                    body: body,
                    type: "alert"
                }
            });
        }
        */
    }

    /**Función que permite mostrar/ocultar las alertas desde algun componente consumidor
     * 
     * @param {*} data 
     */
    const handleMessage = (data) => {
        dispatch({
            type: MESSAGE, payload: data
        });
    }
    return (
        <authContext.Provider value={{
            userInfo: state.userInfo,
            message: state.message,
            loading: state.loading,
            initialLoading: state.initialLoading,
            initialMessage: state.initialMessage,
            authenticated: state.authenticated,
            successSignin: state.successSignin,
            login,
            logout,
            handleMessage,
            makeChange,
            getUserInSession,
        }}>
            {props.children}
        </authContext.Provider>

    );
}
export default AuthState;