
/**Evalua la respuesta del servidor y retorna un mensaje
 * 
 * @returns message, un objeto con los atributos titulo y cuerpo
 */
export const evaluateResponseError = (error) => {
    // console.log(error)
    // console.log("LOGIN_ERROR", error.response.data.message);

    let title = "Error";
    let body = ""
    let show = true;
    if(error.response){
        // console.error("ErrorCode", error.response.status);
        // console.error("ErrorCode", error.response.data);


    }
    if (error.response && error.response.status !== 500) {

        // console.error("ErrorData", error.response.data);

        if (error.response.status === 401) { //Errores de de autenticación
            if (error.response.data) {

                if (error.response.data.message && error.response.data.message !== "") {
                    body = error.response.data.message;
                    show = false;
                } else {
                    body = "Su sesión ha expirado, por favor ingrese nuevamente"
                }

            } else {
                body = "Acceso no autorizado"
            }

        } else if (error.response.status === 405) {
            body = "Endpoint accedido mediante metodo incorrecto"

        } else if (error.response.status === 400) {
            // console.error("ESTRUCTURA")
            body = "Ha ocurrido un error al contactar al servidor, por favor contacte al desarrollador"

        } else if (error.response.status === 429) {
            body = "La carga del servidor es un poco alta en este momento, por favor intente mas tarde"

        }

        return ({ title, body, show })

    }
    return { title, body: "Error al contactar el servidor, por favor intente nuevamente" }
}


export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}