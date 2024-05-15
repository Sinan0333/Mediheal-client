import axios from 'axios'
import { PrescriptionData } from '../../types/doctorTypes';
const baseURL = `${import.meta.env.VITE_BASE_URL}/doctor/prescription`

const doctorPrescriptionApi = axios.create({
    baseURL
})

doctorPrescriptionApi.interceptors.request.use(

    (config)=>{
        
    const doctorToken = localStorage.getItem('doctorToken')

    if(doctorToken){
        config.headers['Authorization'] = `Bearer ${doctorToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)

export const getPatientPrescription = async (_id:string)=>{
    try { 
        const result =  await doctorPrescriptionApi.get(`/patient/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}


export const addPrescription = async (data:PrescriptionData)=>{
    try { 
        const result =  await doctorPrescriptionApi.post("/add",data) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}
