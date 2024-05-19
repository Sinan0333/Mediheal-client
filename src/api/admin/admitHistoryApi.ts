import axios from 'axios'
import { handleAdminApiError, handleApiResponse } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/admin/admit_history`

const admitBedHistoryApi = axios.create({
    baseURL
})

admitBedHistoryApi.interceptors.request.use(

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

admitBedHistoryApi.interceptors.response.use(handleApiResponse,handleAdminApiError);

export const getAdmitHistoryDetailsApi = async (_id:string | undefined)=>{
    try { 
        const result =  await admitBedHistoryApi.get(`/view/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getAllAdmitHistory = async (query?:string)=>{
    try { 
        const result =  await admitBedHistoryApi.get(`/?${query}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const totalAdmits = async (query?:string)=>{
    try { 
        const result =  await admitBedHistoryApi.get(`/count?${query}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getAdmitRevenue = async ()=>{
    try { 
        const result =  await admitBedHistoryApi.get('/revenue')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}
