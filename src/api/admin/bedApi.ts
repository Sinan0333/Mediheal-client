import axios from 'axios'
import { AddBedValidation } from '../../types/adminTypes'

const adminApi= axios.create({
    baseURL:'http://localhost:3000/admin/bed'
})


export const addBedApi = async (data:AddBedValidation)=>{
    try { 
        const result =  await adminApi.post('/add',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

