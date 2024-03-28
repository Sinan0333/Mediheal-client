import  { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom'
import { notifyError } from './toast';

export const handleResponse = (response:AxiosResponse) =>{
    const navigate = useNavigate()

    if(response.status != 200){
        navigate('/error')
    }else if(!response.data.status){
        notifyError(response.data.message)
    }else{
        return response.data
    }

}