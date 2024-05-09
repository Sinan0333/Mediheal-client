import axios from 'axios'

const patientManagementApi = axios.create({
    baseURL:'http://localhost:3000/admin/patient'
})

patientManagementApi.interceptors.request.use(

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

export const getPatients = async (query?:string)=>{
    try { 
        const result =  await patientManagementApi.get(`/?${query}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}


export const getPatient = async (_id:string | undefined)=>{
    try { 
        const result =  await patientManagementApi.get(`/view/${_id}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}


export const totalPatients = async (query?:string)=>{
    try { 
        const result =  await patientManagementApi.get(`/count?${query}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}