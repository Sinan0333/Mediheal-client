import axios from 'axios'
import { handleApiResponse, handleUserApiError } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/user/doctor`

const doctorApi= axios.create({
    baseURL
})

doctorApi.interceptors.request.use(

    (config)=>{
        
    const userToken = localStorage.getItem('userToken')

    if(userToken){
        config.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)

doctorApi.interceptors.response.use(handleApiResponse,handleUserApiError);


export const unblockedDoctors = async (query:string)=>{
    try {         
        const result =  await doctorApi.get(`/list/unblocked?${query}`)          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getDoctorDataApi = async (_id:string | undefined)=>{
    try {         
        const result =  await doctorApi.get(`/view/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getBestDoctors = async ()=>{
    
    try {       
        const result =  await doctorApi.get("/list/best")         
        return result.data
    } catch (error) {
        console.log(error);
    }
}



