import axios from 'axios'
import { LoginType, SignupData } from '../../types/userTypes'

const userApi = axios.create({
    baseURL:'http://localhost:3000'
})

const userSignup = async (data:SignupData)=>{
    try { 
        const result =  await userApi.post('/signup',data) 
        console.log(result);
         
        return result.data 
    } catch (error) {
        console.log(error);
    }
}


const userLogin = async (data:LoginType)=>{
    try { 
        const result =  await userApi.post('/login',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export{
    userSignup,
    userLogin
}