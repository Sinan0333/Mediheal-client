import axios from 'axios'
import { handleAdminApiError, handleApiResponse } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/admin/appointment`

const adminAppointmentApi = axios.create({
    baseURL
})

adminAppointmentApi.interceptors.request.use(

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

adminAppointmentApi.interceptors.response.use(handleApiResponse,handleAdminApiError);


export const getAppointmentRevenue = async ()=>{
    try { 
        const result =  await adminAppointmentApi.get('/revenue')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const getStatusWiseAppointmentCountApi = async ()=>{
    try { 
        const result =  await adminAppointmentApi.get('/status_wise_count')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getTypeWiseAppointmentCountApi = async ()=>{
    try { 
        const result =  await adminAppointmentApi.get('/status_type_count')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}