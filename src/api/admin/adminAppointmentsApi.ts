import axios from 'axios'
const baseURL = `${import.meta.env.VITE_BASE_URL}/admin/appointment`

const adminAppointmentApi = axios.create({
    baseURL
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

adminAppointmentApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.log("in first error");
            
            console.log('Response status:', error.response.status);
            // Server responded with a status other than 200 range
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            console.log("in second error");
            
            console.log('Request was made but no response was received');
            // Request was made but no response was received
            console.error('Request error:', error.request);
        } else {
            console.log("in third error");
            
            console.log('Error', error.message);
            // Something happened in setting up the request
            console.error('Error', error.message);
        }
        return Promise.reject(error);
    }
);


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

export const getTypeWiseAppointmentCountApi = async ()=>{
    try { 
        const result =  await adminAppointmentApi.get('/status_type_count')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}