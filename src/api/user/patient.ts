import axios from 'axios'
import { PatientData } from '../../types/userTypes'

const patientApi = axios.create({
    baseURL:'http://localhost:3000/patient'
})

patientApi.interceptors.request.use(

    (config)=>{
        
    const userToken = localStorage.getItem('userToken')

    if(userToken){
        config.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)


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

export const getPatientData = async (_id:string)=>{
    try { 
        const result =  await patientApi.get(`/view/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const editPatientData = async (_id:string,data:PatientData)=>{
    try { 
        const result =  await patientApi.post(`/edit/${_id}`,data) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getPatientPrescriptions = async (_id:string)=>{
    try { 
        const result =  await patientApi.get(`/prescription/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

