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

