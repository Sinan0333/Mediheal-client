import axios from 'axios'
import { LoginType, SignupData } from '../../types/userTypes'
const baseURL = `${import.meta.env.VITE_BASE_URL}/auth/user`

const userApi = axios.create({
    baseURL
})

export const userSignup = async (data:SignupData)=>{
    try { 
        const result =  await userApi.post('/signup',data) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getOtp = async (_id:string | undefined)=>{
    try { 
        const result =  await userApi.get(`/get_otp/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const resendOtp = async (_id:string | undefined)=>{
    try { 
        const result =  await userApi.get(`/resend_otp/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}



export const verifyOtp = async (_id:string | undefined,otp:string)=>{
    try { 
        const result =  await userApi.post('/verify',{_id,otp})  
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const userLogin = async (data:LoginType)=>{
    try { 
        const result =  await userApi.post('/login',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const googleAuth = async (credential:string)=>{
    try { 
        const result =  await userApi.post('/google_auth',{credential})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const verifyEmail = async (email:string)=>{
    try { 
        const result =  await userApi.put('/verify_email',{email})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const changeUserPassword = async (_id:string,password:string)=>{
    try { 
        const result =  await userApi.patch('/change_password',{_id,password})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}


