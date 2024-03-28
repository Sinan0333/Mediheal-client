import axios from 'axios'
import { AddDoctorApi,  } from '../../types/doctorTypes'

const doctorApi= axios.create({
    baseURL:'http://localhost:3000/doctor'
})


export const addDoctor = async (data:AddDoctorApi)=>{
    try {         
        const result =  await doctorApi.post('/add',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const listDoctorsApi = async ()=>{
    try {         
        const result =  await doctorApi.get('/list')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const unblockedDoctors = async ()=>{
    try {         
        const result =  await doctorApi.get('/list/unblocked')          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getDoctorDataApi = async (_id:string | undefined)=>{
    try {         
        const result =  await doctorApi.get(`/view/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const editDoctorDataApi = async (data:AddDoctorApi,_id:string | undefined)=>{    
    try {           
        const result =  await doctorApi.post(`/edit/${_id}`,data) 
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const changeBlockStatus = async (_id:string | undefined,is_blocked:boolean | undefined)=>{
    
    try {           
        const result =  await doctorApi.post(`/block/${_id}`,{is_blocked:is_blocked})         
        return result.data
    } catch (error) {
        console.log(error);
    }
}


