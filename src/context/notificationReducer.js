import {

    GET_NOTIFICATIONS,
    LOADING_NOTIFICATIONS,
    INCREMENT_NOTIFICATION,
    NOTIFICATIONS_MESSAGE,
    READ_ERROR,
    NOTIFICATIONS_COUNTER,
    DECREMENT_NOTIFICATION
} from './types';


export default (state, action) => {

    switch (action.type) {
        case NOTIFICATIONS_MESSAGE:
            return {
                ...state,
                notificationsMessage: action.payload,
                loadingNotifications: false
            }
        case GET_NOTIFICATIONS:


            let notificationsWithOutRead = (action.payload).filter((element) => {
                if (element.estado == "1") {
                    return element;
                }
            });

            return {
                ...state,
                notifications: action.payload,
                notificationCounter: notificationsWithOutRead.length,
                loadingNotifications: false,
                notificationsMessage: null
            }

        case LOADING_NOTIFICATIONS:
            return {
                ...state,
                loadingNotifications: action.payload,
            }

        case INCREMENT_NOTIFICATION:
            return {
                ...state,
                notificationCounter: state.notificationCounter + 1,

            }

        case READ_ERROR:

            return {
                ...state,
                error: action.payload,
            }
        case NOTIFICATIONS_COUNTER:

            return {
                ...state,
                notificationCounter: action.payload,
            }
        case DECREMENT_NOTIFICATION:

            return {
                ...state,
                notificationCounter: state.notificationCounter > 0 ? state.notificationCounter - 1 : 0
            }
        default:
            return state;
    }
}