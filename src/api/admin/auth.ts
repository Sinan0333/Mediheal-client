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

