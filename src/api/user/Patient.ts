import axios from 'axios'
import { PatientData } from '../../types/userTypes'

const patientApi = axios.create({
    baseURL:'http://localhost:3000/patient'
})


export const addPatient = async (data:PatientData)=>{
    try { 
        const result =  await patientApi.post('/add',data) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

