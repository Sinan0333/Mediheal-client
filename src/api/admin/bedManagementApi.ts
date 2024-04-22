import axios from 'axios'
import { AddBedValidation, AssignPatientType, BedEditData} from '../../types/adminTypes'

const bedManagementApi = axios.create({
    baseURL:'http://localhost:3000/admin/bed'
})

bedManagementApi.interceptors.request.use(

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

export const addBedApi = async (data:AddBedValidation)=>{
    try { 
        const result =  await bedManagementApi.post('/add',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getBedDetailsApi = async (_id:string | undefined)=>{
    try { 
        const result =  await bedManagementApi.get(`/view/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getAllBeds = async ()=>{
    try { 
        const result =  await bedManagementApi.get('/')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const changeBedBlock = async (_id:string ,is_blocked:boolean)=>{
    try { 
        const result =  await bedManagementApi.post(`/block/${_id}`,{is_blocked})  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const assignPatientApi = async (data:AssignPatientType)=>{
    try { 
        const result =  await bedManagementApi.post("/assign",data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const updateBedApi = async (_id:string | undefined,data:BedEditData)=>{
    try { 
        const result =  await bedManagementApi.post(`/edit/${_id}`,data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const dischargePatientApi = async (_id:string | undefined)=>{
    try { 
        const result =  await bedManagementApi.put(`/discharge/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}