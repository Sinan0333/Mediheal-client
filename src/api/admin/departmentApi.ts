import axios from 'axios'
import { DepartmentApiType } from '../../types/adminTypes'

const departmentApi= axios.create({
    baseURL:'http://localhost:3000/admin/department'
})


const addDepartment = async (data:DepartmentApiType)=>{
    try {         
        const result =  await departmentApi.post('/add',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

const listDepartmentApi = async ()=>{
    try {         
        const result =  await departmentApi.get('/')          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export{
    addDepartment,
    listDepartmentApi,
}