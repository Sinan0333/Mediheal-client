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

export const getDoctorDataApi = async (_id:string | undefined)=>{
    try {         
        const result =  await doctorApi.get(`/view/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const editDoctorDataApi = async (data:AddDoctorApi,_id:string | undefined)=>{
    console.log('starting of edit api');
    
    try {           
        const result =  await doctorApi.post(`/edit/${_id}`,data) 
        console.log(result,'ending');
        
        return result.data
    } catch (error) {
        console.log(error);
    }
}



