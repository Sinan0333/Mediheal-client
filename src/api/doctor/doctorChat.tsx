import axios from 'axios'
import { GetChatDataApiType, MessageType } from '../../types/commonTypes'
import { handleApiResponse, handleDoctorApiError } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/doctor/chat`

const doctorChatApi = axios.create({
    baseURL
})

doctorChatApi.interceptors.request.use(

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

doctorChatApi.interceptors.response.use(handleApiResponse,handleDoctorApiError);

export const createMessage = async (data:MessageType)=>{
    try { 
        const result =  await doctorChatApi.post('/create',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getChatData = async (data:GetChatDataApiType)=>{
    try { 
        const result =  await doctorChatApi.post('/chat_data',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}
