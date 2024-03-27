import axios from 'axios'
import { EditUserDataProps } from '../../types/userTypes'


const userManagementApi = axios.create({
    baseURL:'http://localhost:3000/list'
})


export const listUsers = async ()=>{
    try { 
        const result =  await userManagementApi.get('/') 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getUserDataApi = async (_id:string | undefined)=>{
    try { 
        const result =  await userManagementApi.post('/view',{_id}) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const editUserData = async (data:EditUserDataProps)=>{
    try { 
        console.log('in starting of edituser');
        
        const result =  await userManagementApi.post('/edit',data) 
        console.log('in ending of edit user',result);
        
        return result.data 
    } catch (error) {
        console.log(error);
    }
}


