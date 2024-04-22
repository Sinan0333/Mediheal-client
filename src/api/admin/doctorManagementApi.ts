import axios from 'axios'
import { AddDoctorApi,  } from '../../types/doctorTypes'

const doctorManagementApi= axios.create({
    baseURL:'http://localhost:3000/admin/doctor'
})

doctorManagementApi.interceptors.request.use(

    (config)=>{

    const adminToken = localStorage.getItem('adminToken')

    if(adminToken){
        config.headers['Authorization'] = `Bearer ${adminToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)


export const addDoctor = async (data:AddDoctorApi)=>{
    try {         
        const result =  await doctorManagementApi.post('/add',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const listDoctorsApi = async ()=>{
    try {         
        const result =  await doctorManagementApi.get('/list')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const unblockedDoctors = async ()=>{
    try {         
        const result =  await doctorManagementApi.get('/unblocked')          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getDoctorDataApi = async (_id:string | undefined)=>{
    try {         
        const result =  await doctorManagementApi.get(`/view/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const editDoctorDataApi = async (data:AddDoctorApi,_id:string | undefined)=>{    
    try {           
        const result =  await doctorManagementApi.post(`/edit/${_id}`,data) 
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const changeBlockStatus = async (_id:string | undefined,is_blocked:boolean | undefined)=>{
    
    try {           
        const result =  await doctorManagementApi.post(`/block/${_id}`,{is_blocked:is_blocked})         
        return result.data
    } catch (error) {
        console.log(error);
    }
}



