import axios from 'axios'
import { handleApiResponse, handleUserApiError } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/user/department`

const departmentApi= axios.create({
    baseURL
})

departmentApi.interceptors.request.use(

    (config)=>{
        
    const userToken = localStorage.getItem('userToken')

    if(userToken){
        config.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)

departmentApi.interceptors.response.use(handleApiResponse,handleUserApiError);


export const unblockedDepartments = async ()=>{
    try {         
        const result =  await departmentApi.get('/unblocked')          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}



