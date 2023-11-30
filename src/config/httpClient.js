import axios from "axios";

const instance = axios.create({
    baseURL: 'https://colombiapcc.com/api',
    timeout: 30000,
});
export default instance;