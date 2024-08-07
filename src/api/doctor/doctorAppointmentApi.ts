import axios from 'axios'
import { WalletHistoryData } from '../../types/userTypes'
import { handleApiResponse, handleDoctorApiError } from '../../constants/constFunctions'
const baseURL = `${import.meta.env.VITE_BASE_URL}/doctor/appointment`

const doctorAppointmentApi= axios.create({
    baseURL
})

doctorAppointmentApi.interceptors.request.use(

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

doctorAppointmentApi.interceptors.response.use(handleApiResponse,handleDoctorApiError);


export const getDoctorAppointments = async (_id:string,query?:string)=>{
    try {         
        const result =  await doctorAppointmentApi.get(`/list/${_id}?${query}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const cancelBooking = async (_id:string,data:WalletHistoryData)=>{
    try { 
        const result =  await doctorAppointmentApi.post(`/cancel/${_id}`,data) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const cancelBookingWhenBreak = async (slotId:string)=>{
    try { 
        const result =  await doctorAppointmentApi.get(`/cancel_when_break/${slotId}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const changeAChatStatus = async (_id:string,chat:boolean)=>{
    try { 
        const result =  await doctorAppointmentApi.post("/change_chat_status",{_id,chat}) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const changeStatus = async (_id:string)=>{
    try { 
        const result =  await doctorAppointmentApi.get(`/change_status?_id=${_id}&status=Checked`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getDoctorPatients = async (_id:string,query?:string)=>{
    try { 
        const result =  await doctorAppointmentApi.get(`/my_patients/${_id}?${query}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const totalDoctorPatients = async (_id:string,query?:string)=>{
    try { 
        const result =  await doctorAppointmentApi.get(`/my_patients/count/${_id}?${query}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const totalDoctorAppointments = async (_id:string,query?:string)=>{
    try { 
        const result =  await doctorAppointmentApi.get(`/count/${_id}?${query}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getDoctorAppointmentRevenue = async (_id:string)=>{
    try { 
        const result =  await doctorAppointmentApi.get(`/revenue/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const getStatusWiseDoctorAppointmentCountApi = async (_id:string)=>{
    try { 
        const result =  await doctorAppointmentApi.get(`/status_wise_count/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getTypeWiseDoctorAppointmentCountApi = async (_id:string)=>{
    try { 
        const result =  await doctorAppointmentApi.get(`/status_type_count/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}