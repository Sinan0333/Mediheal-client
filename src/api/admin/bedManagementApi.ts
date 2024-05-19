import axios from 'axios'
import { AddBedValidation, AssignPatientType, BedEditData} from '../../types/adminTypes'
import { handleAdminApiError, handleApiResponse } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/admin/bed`

const bedManagementApi = axios.create({
    baseURL
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

bedManagementApi.interceptors.response.use(handleApiResponse,handleAdminApiError);

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

export const getAllBeds = async (query:string)=>{
    
    try { 
        const result =  await bedManagementApi.get(`?${query}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const changeBedBlock = async (_id:string|undefined ,is_blocked:boolean)=>{
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

export const updateBedTypeAndCharge = async (_id:string,type:string,charge:number,is_blocked:boolean)=>{
    try { 
        const result =  await bedManagementApi.post(`/update/${_id}`,{type,charge,is_blocked})  
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

export const totalBeds = async (query?:string)=>{
    try { 
        const result =  await bedManagementApi.get(`/count?${query}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const totalFreeBeds = async ()=>{
    try { 
        const result =  await bedManagementApi.get("/vacant_beds_count")  
        return result.data
    } catch (error) {
        console.log(error);
    }
}