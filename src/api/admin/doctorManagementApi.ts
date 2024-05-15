import axios from 'axios'
import { AddDoctorApi,  } from '../../types/doctorTypes'
const baseURL = `${import.meta.env.VITE_BASE_URL}/admin/doctor`


const doctorManagementApi= axios.create({
    baseURL
})

const cancelTokenSource = axios.CancelToken.source();

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

export const listDoctorsApi = async (query:string)=>{
    try {         
        const result =  await doctorManagementApi.get(`/list?${query}`,{  cancelToken: cancelTokenSource.token })  
        return result.data
    } catch (error:any) {

        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message); 
        } else {
            console.log('Error:', error.message); 
        }

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

export const totalDoctors = async (query?:string)=>{    
    try {           
        const result =  await doctorManagementApi.get(`/count?${query}`) 
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const cancelRequest = () => {
    cancelTokenSource.cancel('Request canceled by user'); 
};