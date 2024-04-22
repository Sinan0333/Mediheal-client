import axios from 'axios'
import { LoginType } from '../../types/userTypes'

const doctorApi = axios.create({
    baseURL:'http://localhost:3000/auth/doctor'
})


export const doctorLogin = async (data:LoginType)=>{
    try { 
        const result =  await doctorApi.post('/login',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

