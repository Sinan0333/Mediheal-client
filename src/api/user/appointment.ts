import axios from 'axios'
import { AppointmentData } from '../../types/commonTypes'
import { WalletHistoryData } from '../../types/userTypes'
const appointmentApi = axios.create({
    baseURL:'http://localhost:3000/appointment'
})


export const createCheckoutSession = async (amount:number)=>{
    try { 
        const result =  await appointmentApi.post("/create-checkout-session",{amount:amount}) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const confirmBooking = async (scheduleId:string | undefined,data:AppointmentData)=>{
    try { 
        const result =  await appointmentApi.post(`/confirm_booking/${scheduleId}`,data) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const bookingHistory = async (userId:string)=>{
    try { 
        const result =  await appointmentApi.get(`/history/${userId}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const cancelBooking = async (_id:string,data:WalletHistoryData)=>{
    try { 
        const result =  await appointmentApi.post(`/cancel/${_id}`,data) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}