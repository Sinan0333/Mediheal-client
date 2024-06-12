import axios from 'axios'
import { LoginType } from '../../types/userTypes'
const baseURL = `${import.meta.env.VITE_BASE_URL}/auth/admin`

const adminApi= axios.create({
    baseURL
})


export const adminLogin = async (data:LoginType)=>{
    try { 
        const result =  await adminApi.post('/login',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const verifyAdminEmail = async (email:string)=>{
    try { 
        const result =  await adminApi.put('/verify_email',{email})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getOtp = async (_id:string | undefined)=>{
    try { 
        const result =  await adminApi.get(`/get_otp/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const  verifyOtp = async (_id:string,otp:string)=>{
    try { 
        const result =  await adminApi.post("/verify",{_id,otp})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const changeAdminPassword = async (_id:string,password:string)=>{
    try { 
        const result =  await adminApi.patch('/change_password',{_id,password})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const resendOtp = async (_id:string | undefined)=>{
    try { 
        const result =  await adminApi.get(`/resend_otp/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}