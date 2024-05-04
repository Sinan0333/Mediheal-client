import axios from 'axios'

const admitBedHistoryApi = axios.create({
    baseURL:'http://localhost:3000/admin/admit_history'
})

admitBedHistoryApi.interceptors.request.use(

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


export const getAdmitHistoryDetailsApi = async (_id:string | undefined)=>{
    try { 
        const result =  await admitBedHistoryApi.get(`/view/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getAllAdmitHistory = async ()=>{
    try { 
        const result =  await admitBedHistoryApi.get('/')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const totalAdmits = async ()=>{
    try { 
        const result =  await admitBedHistoryApi.get('/count')  
        return result.data
    } catch (error) {
        console.log(error);
    }
}
