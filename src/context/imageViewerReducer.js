import {

    SET_IMAGES,

} from './types';


export default (state, action) => {

    switch (action.type) {
        case SET_IMAGES:
            return {
                ...state,
                images: action.payload.data,
                index: action.payload.index

            }

        default:
            return state;
    }
}