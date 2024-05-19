import axios from 'axios'
import { GetChatDataApiType, MessageType } from '../../types/commonTypes';
import { handleApiResponse, handleUserApiError } from '../../constants/constFunctions';
const baseURL = `${import.meta.env.VITE_BASE_URL}/user/chat`

const userChatApi = axios.create({
    baseURL
})

userChatApi.interceptors.request.use(

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

userChatApi.interceptors.response.use(handleApiResponse,handleUserApiError);

export const createMessage = async (data:MessageType)=>{
    try { 
        
        const result =  await userChatApi.post('/create',data) 
        return result.data 
        
    } catch (error) {
        console.log(error);
    }
}


export const getChatData = async (data:GetChatDataApiType)=>{
    try { 
        
        const result =  await userChatApi.post('/chat_data',data) 
        return result.data 
        
    } catch (error) {
        console.log(error);
    }
}

