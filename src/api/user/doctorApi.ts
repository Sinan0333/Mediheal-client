import axios from 'axios'

const doctorApi= axios.create({
    baseURL:'http://localhost:3000/'
})

doctorApi.interceptors.request.use(

    (config)=>{
        
    const userToken = localStorage.getItem('userToken')

    if(userToken){
        config.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return config

    },

    (error)=>{
        return Promise.reject(error)
    }
)


export const unblockedDoctors = async ()=>{
    try {         
        const result =  await doctorApi.get('/list/unblocked')          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getDoctorDataApi = async (_id:string | undefined)=>{
    try {         
        const result =  await doctorApi.get(`/view/${_id}`)  
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const getBestDoctors = async ()=>{
    
    try {       
        const result =  await doctorApi.get("/list/best")         
        return result.data
    } catch (error) {
        console.log(error);
    }
}


