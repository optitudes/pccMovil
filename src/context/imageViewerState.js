
import React, { useReducer } from 'react';
import imageViewerContext from './imageViewerContext';
import imageViewerReducer from './imageViewerReducer';

import {
    SET_IMAGES,
} from './types';

/**Módulo que permite gestionar las imagenes del visor de imagenes
 * 
 * @param {*} props 
 * @returns 
 */

const ImageViewerState = props => {

    const initialState = {
        images: [],
        index: 0
    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(imageViewerReducer, initialState);

    /**Permite seleccionar las imagenes a cargar en el visor y el indice
     * de la imagen donde debe iniciar
     * 
     * @param {*} data 
     * @param {*} index 
     */
    const setImages = (data, index) => {

        dispatch({ type: SET_IMAGES, payload: { data, index } });
    }
    return (
        <imageViewerContext.Provider value={{
            images: state.images,
            index: state.index,
            setImages
        }}>
            {props.children}
        </imageViewerContext.Provider>

    );
}
export default ImageViewerState;