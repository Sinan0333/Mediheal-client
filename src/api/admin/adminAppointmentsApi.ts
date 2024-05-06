import axios from 'axios'

const adminAppointmentApi = axios.create({
    baseURL:'http://localhost:3000/admin/appointment'
})

adminAppointmentApi.interceptors.request.use(

    (config)=>{
        
    const adminToken = localStorage.getItem('adminToken')

    if(adminToken){
        config.headers['Authorization'] = `Bearer ${adminToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)


export const getAppointmentRevenue = async ()=>{
    try { 
        const result =  await adminAppointmentApi.get('/revenue')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const getStatusWiseAppointmentCountApi = async ()=>{
    try { 
        const result =  await adminAppointmentApi.get('/status_wise_count')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}