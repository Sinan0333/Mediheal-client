import axios from 'axios'
import { DoctorData } from '../../types/doctorTypes'

const doctorApi= axios.create({
    baseURL:'http://localhost:3000/doctor'
})


export const addDoctor = async (data:DoctorData)=>{
    try {         
        const result =  await doctorApi.post('/add',data)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}



