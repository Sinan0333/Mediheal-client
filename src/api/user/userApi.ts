import axios from 'axios'
import { EditUserDataProps} from '../../types/userTypes'
import { handleApiResponse, handleUserApiError } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/user`

const userApi = axios.create({
    baseURL
})

userApi.interceptors.request.use(

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

userApi.interceptors.response.use(handleApiResponse,handleUserApiError);


export const editUserData = async (data:EditUserDataProps)=>{
    try { 
        
        const result =  await userApi.post('/profile/edit_profile',data) 
        return result.data 
        
    } catch (error) {
        console.log(error);
    }
}

export const removeProfileDpApi = async (_id:string)=>{
    try { 
        
        const result =  await userApi.patch(`/profile/remove_profile_dp/${_id}`) 
        return result.data 
        
    } catch (error) {
        console.log(error);
    }
}

export const getUserData = async (_id:string)=>{
    try { 
        
        const result =  await userApi.post('/profile',{_id}) 
        return result.data 
        
    } catch (error) {
        console.log(error);
    }
}

export const walletPaymentApi = async (_id:string,amount:number)=>{
    try { 
        
        const result =  await userApi.post('/wallet_payment',{_id,amount}) 
        return result.data 
        
    } catch (error) {
        console.log(error);
    }
}