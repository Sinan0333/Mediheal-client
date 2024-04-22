import axios from 'axios'

const doctorApi= axios.create({
    baseURL:'http://localhost:3000/doctor'
})

doctorApi.interceptors.request.use(

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

export const takeABreakApi = async (scheduleId:string,day:string,_id:string)=>{
    try {          
        const result =  await doctorApi.post(`/take_break/${scheduleId}`,{day,_id})         
        return result.data
    } catch (error) {
        console.log(error);
    }
}



