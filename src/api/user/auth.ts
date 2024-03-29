import axios from 'axios'
import { LoginType, SignupData } from '../../types/userTypes'

const userApi = axios.create({
    baseURL:'http://localhost:3000'
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
        const result =  await userApi.post('/get_otp',{_id}) 
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

