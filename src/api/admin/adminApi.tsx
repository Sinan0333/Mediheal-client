import axios from 'axios'
import { handleAdminApiError, handleApiResponse } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/admin`

const adminApi = axios.create({
    baseURL
})

adminApi.interceptors.request.use(

    (config)=>{
        
    const adminToken = localStorage.getItem('adminToken')

    if(adminToken){
        config.headers['Authorization'] = `Bearer ${adminToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)

adminApi.interceptors.response.use(handleApiResponse,handleAdminApiError);


export const getAdminProfileApi = async (_id:string)=>{
    try { 
        const result =  await adminApi.get(`/profile/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}