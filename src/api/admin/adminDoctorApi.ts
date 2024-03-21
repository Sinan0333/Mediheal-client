import axios from 'axios'
import { DoctorData } from '../../types/doctorTypes'

const adminDoctorApi= axios.create({
    baseURL:'http://localhost:3000/admin/doctor'
})


export const addDoctor = async (data:DoctorData)=>{
    try {         
        const result =  await adminDoctorApi.post('/',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}



