import axios from 'axios'
import { AddBedValidation, AssignPatientType} from '../../types/adminTypes'

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

export const getAllBeds = async ()=>{
    try { 
        const result =  await adminApi.get('/')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const changeBedBlock = async (_id:string ,is_blocked:boolean)=>{
    try { 
        const result =  await adminApi.post(`/block/${_id}`,{is_blocked})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const assignPatientApi = async (data:AssignPatientType)=>{
    try { 
        const result =  await adminApi.post("/assign",data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}
