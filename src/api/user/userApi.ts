import axios from 'axios'
import { EditUserDataProps} from '../../types/userTypes'

const userApi = axios.create({
    baseURL:'http://localhost:3000'
})

userApi.interceptors.request.use(

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


export const editUserData = async (data:EditUserDataProps)=>{
    try { 
        
        const result =  await userApi.post('/edit_profile',data) 
        return result.data 
        
    } catch (error) {
        console.log(error);
    }
}

export const getUserData = async (_id:string)=>{
    try { 
        
        const result =  await userApi.post('/profile',{_id}) 
        return result.data 
        
    } catch (error) {
        console.log(error);
    }
}