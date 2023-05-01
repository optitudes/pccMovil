import axios from "axios";

const instance = axios.create({
    baseURL: 'https://3252-152-202-13-181.ngrok-free.app/api',
    timeout: 30000,
});
export default instance;