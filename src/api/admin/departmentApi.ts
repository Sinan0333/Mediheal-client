import axios from 'axios'
import { DepartmentApiType } from '../../types/adminTypes'

const departmentApi= axios.create({
    baseURL:'http://localhost:3000/admin/department'
})


export const addDepartment = async (data:DepartmentApiType)=>{
    try {         
        const result =  await departmentApi.post('/add',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const listDepartmentApi = async ()=>{
    try {         
        const result =  await departmentApi.get(`/`)          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const unblockedDepartments = async ()=>{
    try {         
        const result =  await departmentApi.get('/unblocked')          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const changeDepartmentBlock = async (_id:string | undefined,is_blocked:boolean | undefined)=>{
    
    try {           
        const result =  await departmentApi.post(`/block/${_id}`,{is_blocked:is_blocked})         
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getDepartmentDataById = async (_id:string|undefined )=>{
    
    try {           
        const result =  await departmentApi.get(`/view/${_id}`)         
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const updateDepartment = async (_id:string,data:DepartmentApiType)=>{
    try {           
        const result =  await departmentApi.post(`/edit/${_id}`,data)         
        return result.data
    } catch (error) {
        console.log(error);
    }
}
