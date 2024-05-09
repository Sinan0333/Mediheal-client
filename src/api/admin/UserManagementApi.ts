import axios from 'axios'

const userManagementApi = axios.create({
    baseURL:'http://localhost:3000/admin/user'
})

userManagementApi.interceptors.request.use(

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

export const listUsers = async (query?:string)=>{
    try { 
        const result =  await userManagementApi.get(`/?${query}`) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}

export const getUserDataApi = async (_id:string | undefined)=>{
    try { 
        const result =  await userManagementApi.post('/view',{_id}) 
        return result.data 
    } catch (error) {
        console.log(error);
    }
}


export const changeUserBlock = async (_id:string | undefined,is_blocked:boolean | undefined)=>{
    
    try {           
        const result =  await userManagementApi.post(`/block/${_id}`,{is_blocked:is_blocked})         
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const totalUsers = async (query?:string)=>{
    
    try {           
        const result =  await userManagementApi.get(`/count?${query}`)         
        return result.data
    } catch (error) {
        console.log(error);
    }
}
