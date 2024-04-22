import axios from 'axios'

const departmentApi= axios.create({
    baseURL:'http://localhost:3000/department'
})

departmentApi.interceptors.request.use(

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


export const unblockedDepartments = async ()=>{
    try {         
        const result =  await departmentApi.get('/unblocked')          
        return result.data 
    } catch (error) {
        console.log(error);
    }
}



