import axios from "axios";

const api = axios.create({
    baseURL:import.meta.env.VITE_URL_BASE 
})

 api.interceptors.request.use(config => {
     const TOKEN = localStorage.getItem('vetapp');
     if(TOKEN){
         config.headers.Authorization=`Bearer ${TOKEN}`
     }
     return config;
 }
 )

export default api;