import axios from 'axios'
import { WalletHistoryData } from '../../types/userTypes'


const doctorAppointmentApi= axios.create({
    baseURL:'http://localhost:3000/doctor/appointment'
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


export const getDoctorAppointments = async (_id:string)=>{
    try {         
        const result =  await doctorAppointmentApi.get(`/list/${_id}`)  
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