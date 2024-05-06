import axios from 'axios'

const doctorAdmitHistoryApi = axios.create({
    baseURL:'http://localhost:3000/doctor/admit_history'
})

doctorAdmitHistoryApi.interceptors.request.use(

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



export const totalDoctorAdmits = async (_id:string)=>{
    try { 
        const result =  await doctorAdmitHistoryApi.get(`/count/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getDoctorAdmitRevenue = async (_id:string)=>{
    try { 
        const result =  await doctorAdmitHistoryApi.get(`/revenue/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}
