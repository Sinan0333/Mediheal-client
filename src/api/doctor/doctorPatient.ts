import axios from 'axios'

const doctorPatientApi = axios.create({
    baseURL:'http://localhost:3000/doctor/patient'
})

doctorPatientApi.interceptors.request.use(

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

export const getPatientApi = async (_id:string | undefined)=>{
    try { 
        const result =  await doctorPatientApi.get(`/view/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

