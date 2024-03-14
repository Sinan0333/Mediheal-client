import axios from 'axios'
import { UserData } from '../../types/userTypes'

const userApi = axios.create({
    baseURL:'http://localhost:3000'
})

const userSignup = async (data:UserData)=>{
    try { 
        const result =  await userApi.post('/signup',data)  
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

export{
    userSignup
}