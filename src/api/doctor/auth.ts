import axios from 'axios'
import { LoginType } from '../../types/userTypes'
const baseURL = `${import.meta.env.VITE_BASE_URL}/auth/doctor`

const doctorApi = axios.create({
    baseURL
})


export const doctorLogin = async (data:LoginType)=>{
    try { 
        const result =  await doctorApi.post('/login',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const verifyDoctorEmail = async (email:string)=>{
    try { 
        const result =  await doctorApi.put('/verify_email',{email})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getOtp = async (_id:string | undefined)=>{
    try { 
        const result =  await doctorApi.get(`/get_otp/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const  verifyOtp = async (_id:string,otp:string)=>{
    try { 
        const result =  await doctorApi.post("/verify",{_id,otp})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const changeDoctorPassword = async (_id:string,password:string)=>{
    try { 
        const result =  await doctorApi.patch('/change_password',{_id,password})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const resendOtp = async (_id:string | undefined)=>{
    try { 
        const result =  await doctorApi.get(`/resend_otp/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}
