/* eslint-disable*/
import {
    USER_IN_SESSION,
    LOGOUT,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    LOADING,
    ERROR_LOGOUT,
    MESSAGE,
    ERROR_INITIAL,
    INITIAL_LOADING,
    SELECT_MANAGEMENT,
} from '../constants/types';

/**Se modifica el estado segun una determinada acción
 * 
 */
export default (state, action) => {

    switch (action.type) {
        case ERROR_LOGIN:


            return {
                ...state,
                message: action.payload,
                loading: false,
                initialLoading: false,
            }

        case ERROR_LOGOUT:

            return {
                ...state,
                message: action.payload,
                loading: false
            }

        case ERROR_INITIAL:


            return {
                ...state,
                initialMessage: action.payload,
                userInfo: null,
                currentManagement: null,
                authenticated: false,
                initialLoading: false
            }
        case MESSAGE:

            return {
                ...state,
                message: action.payload,
            }

        case SUCCESS_LOGIN:

        //esta secccion se puede usar para hacer filtrados y validaciones a
        //la informaicon del usuario antes de guardarla en el provider
            let userInfo = action.payload.userInfo;
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false,
                ["userInfo"]: userInfo,
            }

            /*
            let userInfo = {
                name: data.user_data.name,
                lastName: data.user_data.lastName,
                email: data.user_data.email,
                userType: data.user_data.role_id,
                phone: data.user_data.phone,
                // firstEntry: data.primer_ingreso,
                userId: data.user_data.user_id,
            };
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false,
                userInfo:null,
                malocaInfo: {
                    nit: "",
                    businessName:  "",
                }
            }
            */

        case USER_IN_SESSION:

            let myData = action.payload;
            let myManagements = null;
            let lastManagement = null;

            let currentUser = {
                name: myData.name,
                lastName: myData.lastName,
                email: myData.email,
                phone: myData.phone,
                userType: myData.role_id,
                // firstEntry: data.primer_ingreso,
                userId: myData.user_id,
            };

            if (myData.associations.managements.length !== 0) {
                myManagements = myData.associations.managements;
            }

            //se valida que si hay una administración de ingreso por defecto
            if (myData.selectedManagement) {
                lastManagement = myData.selectedManagement

            } else {

                if (myManagements === null) {
                    lastManagement = {
                        name: myData.management_description,
                        idManagement: myData.management_id
                    }
                }

            }

            return {
                ...state,
                authenticated: true,
                initialMessage: null,
                initialLoading: false,
                userInfo: currentUser,
                managements: myManagements,
                currentManagement: lastManagement,
                malocaInfo: {
                    nit: myData.maloca.nit ?? "",
                    businessName: myData.maloca.razon_social ?? "",
                }

            }
        case LOGOUT:
            return {
                ...state,
                authenticated: false,
                loading: false,
                message: null,
                userInfo: null,
                currentManagement: null
            }
        case LOADING:
            return {
                ...state,
                loading: true,
            }
        case SELECT_MANAGEMENT:
            return {
                ...state,
                currentManagement: action.payload,
                loading: false,
            }

        case INITIAL_LOADING:
            return {
                ...state,
                initialLoading: action.payload,
            }
        default:
            return state;
    }
}