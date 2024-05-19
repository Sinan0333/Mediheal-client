import axios from 'axios'
import { handleAdminApiError, handleApiResponse } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/admin/patient`

const patientManagementApi = axios.create({
    baseURL
})

patientManagementApi.interceptors.request.use(

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

patientManagementApi.interceptors.response.use(handleApiResponse,handleAdminApiError);

export const getPatients = async (query?:string)=>{
    try { 
        const result =  await patientManagementApi.get(`/?${query}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}


export const getPatient = async (_id:string | undefined)=>{
    try { 
        const result =  await patientManagementApi.get(`/view/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}


export const totalPatients = async (query?:string)=>{
    try { 
        const result =  await patientManagementApi.get(`/count?${query}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}