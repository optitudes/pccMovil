import axios from "axios";

const instance = axios.create({
    baseURL: 'http://144.217.80.181:80/pccApi/public/api',
    timeout: 30000,
});
export default instance;