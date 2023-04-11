import httpClient from "./httpClient";

const authToken = token => {
    if (token) {
        httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {

        delete httpClient.defaults.headers.common["Authorization"];
    }

}

export default authToken;