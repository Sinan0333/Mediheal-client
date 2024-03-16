import axios from 'axios'
import { LoginType } from '../../types/userTypes'

const adminApi= axios.create({
    baseURL:'http://localhost:3000/admin'
})


const adminLogin = async (data:LoginType)=>{
    try { 
        const result =  await adminApi.post('/login',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export{
    adminLogin
}