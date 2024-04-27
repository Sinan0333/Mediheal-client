import axios from 'axios'
import { GetChatDataApiType, MessageType } from '../../types/commonTypes';

const userChatApi = axios.create({
    baseURL:'http://localhost:3000/chat'
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

