import axios from 'axios'
import { PatientData } from '../../types/userTypes'
import { AppointmentData } from '../../types/commonTypes'

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

export const getUserPatientsApi = async (userId:string)=>{
    try { 
        const result =  await patientApi.get(`/${userId}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const bookNowApi = async (data:AppointmentData)=>{
    try { 
        const result =  await patientApi.post(`/book`,data) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

