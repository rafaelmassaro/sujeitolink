import axios from "axios";

export const key = '47d8ee9a494c0594f7e39f4b7f3d8bb4c0511b87'

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4/',
    headers: {
        'Authorization': `Bearer ${key}`
    }
})

export default api