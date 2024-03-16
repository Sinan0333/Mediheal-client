import axios from 'axios'
import { LoginType } from '../../types/userTypes'

const userApi = axios.create({
    baseURL:'http://localhost:3000/doctor'
})


const doctorLogin = async (data:LoginType)=>{
    try { 
        const result =  await userApi.post('/login',data)  
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

export{
    doctorLogin
}