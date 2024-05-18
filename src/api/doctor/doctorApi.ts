import axios from 'axios'
import { handleApiResponse, handleDoctorApiError } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/doctor`

const doctorApi= axios.create({
    baseURL
})

doctorApi.interceptors.request.use(

    (config)=>{
        
    const doctorToken = localStorage.getItem('doctorToken')

    if(doctorToken){
        config.headers['Authorization'] = `Bearer ${doctorToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)

doctorApi.interceptors.response.use(handleApiResponse,handleDoctorApiError);

export const takeABreakApi = async (scheduleId:string,day:string,_id:string)=>{
    try {          
        const result =  await doctorApi.post(`/take_break/${scheduleId}`,{day,_id})         
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const removeBreakApi = async (scheduleId:string,day:string,_id:string)=>{
    try {          
        const result =  await doctorApi.post(`/remove_break/${scheduleId}`,{day,_id})         
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const getProfileData = async (_id:string)=>{
    try {         
        const result =  await doctorApi.get(`/profile/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

