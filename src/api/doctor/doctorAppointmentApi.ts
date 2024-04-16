import axios from 'axios'


const doctorAppointmentApi= axios.create({
    baseURL:'http://localhost:3000/doctor/appointment'
})


export const getDoctorAppointments = async (_id:string)=>{
    try {         
        const result =  await doctorAppointmentApi.get(`/list/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}




