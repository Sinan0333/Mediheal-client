import axios from 'axios'
import { handleApiResponse, handleDoctorApiError } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/doctor/admit_history`

const doctorAdmitHistoryApi = axios.create({
    baseURL
})

doctorAdmitHistoryApi.interceptors.request.use(

    (config)=>{
        
    const adminToken = localStorage.getItem('doctorToken')

    if(adminToken){
        config.headers['Authorization'] = `Bearer ${adminToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)

doctorAdmitHistoryApi.interceptors.response.use(handleApiResponse,handleDoctorApiError);


export const totalDoctorAdmits = async (_id:string)=>{
    try { 
        const result =  await doctorAdmitHistoryApi.get(`/count/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getDoctorAdmitRevenue = async (_id:string)=>{
    try { 
        const result =  await doctorAdmitHistoryApi.get(`/revenue/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}
