import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.maloca.co/api',
    timeout: 30000,
});
export default instance;