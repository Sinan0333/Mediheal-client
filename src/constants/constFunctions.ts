import axios, { AxiosResponse, AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
const baseURL = `${import.meta.env.VITE_BASE_URL}`
import store from '../store/store';
import { logoutDoctor } from '../store/slice/doctorSlice';
import { logoutAdmin } from '../store/slice/adminSlice';
import { logoutUser } from '../store/slice/userSlice';


export const handlePagination = (i:number,currentPage:number,pages:number[],pageCount:number) => {
    
    if(currentPage === pageCount -3 || currentPage === pageCount -1){
    }
    else if(i===currentPage+1){
        pages.push(pages[pages.length-1]+1)
        pages.shift()
    }else if(i===currentPage+2){
        pages.push(pages[pages.length-1]+1,pages[pages.length-1]+2)
        pages.shift()
        pages.shift()
    }else if(i === currentPage+3){
        pages.push(pages[pages.length-1]+1)
        pages.shift()
    }
    else if(i === currentPage+4){
        pages.push(pages[pages.length-1]+1,pages[pages.length-1]+2)
        pages.shift()
        pages.shift()
    }
    else if(i===currentPage-1){
        pages.unshift(pages[0]-1)
        pages.pop()
    }else if(i===currentPage-2){
        pages.unshift(pages[0]-1,pages[0]-2)
        pages.pop()
        pages.pop()
    }else  {
        pages.length=0
        pages.unshift(pageCount-4,pageCount-3,pageCount-2,pageCount-1,pageCount)
    }
}

export const createInitialPages = (pageCount: number): number[] => {
    let array:number[]=[]
    if(pageCount >=5){
        return [1,2,3,4,5]
    }

    for(let i=0;i<pageCount;i++){
        array.push(i+1)
    }
    
    return array
}

export function handleApiResponse(response: AxiosResponse): AxiosResponse {
    return response;
}

export async function handleDoctorApiError(error: AxiosError): Promise<never> {
    
    if (error.response) {
        if (error.response.status === 401) {
            
            try {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
                
                if (!originalRequest._retry) {
                    originalRequest._retry = true;

                    const refreshToken = localStorage.getItem('doctorRefreshToken');
                    
                    if (!refreshToken) {
                        window.location.href = '/doctor/login';
                        return Promise.reject(error);
                    }

                    const response = await axios.post(baseURL + '/auth/doctor/refresh', { refreshToken });                    

                    localStorage.setItem('doctorToken', response.data.data.accessToken);
                    localStorage.setItem('doctorRefreshToken', response.data.data.refreshToken);

                    if (originalRequest.headers instanceof AxiosHeaders) {
                        originalRequest.headers.set('Authorization', `Bearer ${response.data.data.accessToken}`);
                    } else {
                        const headers = new AxiosHeaders();
                        headers.set('Authorization', `Bearer ${response.data.data.accessToken}`);
                        originalRequest.headers = headers;
                    }

                    return axios(originalRequest);
                }
            } catch (refreshError: any) {
                if (refreshError.response?.status === 401) {
                    localStorage.removeItem('doctorToken');
                    localStorage.removeItem('doctorRefreshToken');
                    window.location.href = '/doctor/login';
                    store.dispatch(logoutDoctor())
                } else {
                    window.location.href = `/error/${refreshError.response?.status || 500}`;
                }
                console.error('Refresh token error:', refreshError.response?.data || refreshError.message);
                return Promise.reject(refreshError);
            }
        } else {
            window.location.href = `/error/${error.response.status}`;
            console.error('Response error:', error.response.data);
        }
    } else if (error.request) {
        window.location.href = `/error/${error.request.status}`;
        console.error('Request error:', error.request);
    } else {
        window.location.href = "/error/500";
        console.error('Error:', error.message);
    }
    return Promise.reject(error);
}


export async function handleAdminApiError(error: AxiosError): Promise<never> {
    
    if (error.response) {
        if (error.response.status === 401) {
            console.log('in admin handleAdminApiError');
            
            try {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
                
                if (!originalRequest._retry) {
                    originalRequest._retry = true;

                    const refreshToken = localStorage.getItem('adminRefreshToken');
    
                    if (!refreshToken) {
                        window.location.href = '/admin/login';
                        return Promise.reject(error);
                    }

                    const response = await axios.post(baseURL + '/auth/admin/refresh', { refreshToken });                    

                    localStorage.setItem('adminToken', response.data.data.accessToken);
                    localStorage.setItem('adminRefreshToken', response.data.data.refreshToken);

                    if (originalRequest.headers instanceof AxiosHeaders) {
                        originalRequest.headers.set('Authorization', `Bearer ${response.data.data.accessToken}`);
                    } else {
                        const headers = new AxiosHeaders();
                        headers.set('Authorization', `Bearer ${response.data.data.accessToken}`);
                        originalRequest.headers = headers;
                    }

                    return axios(originalRequest);
                }
            } catch (refreshError: any) {
                if (refreshError.response?.status === 401) {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminRefreshToken');
                    window.location.href = '/admin/login';
                    store.dispatch(logoutAdmin())
                } else {
                    window.location.href = `/error/${refreshError.response?.status || 500}`;
                }
                console.error('Refresh token error:', refreshError.response?.data || refreshError.message);
                return Promise.reject(refreshError);
            }
        } else {
            window.location.href = `/error/${error.response.status}`;
            console.error('Response error:', error.response.data);
        }
    } else if (error.request) {
        window.location.href = `/error/${error.request.status}`;
        console.error('Request error:', error.request);
    } else {
        window.location.href = "/error/500";
        console.error('Error:', error.message);
    }
    return Promise.reject(error);
}

export async function handleUserApiError(error: AxiosError): Promise<never> {
    
    if (error.response) {
        if (error.response.status === 401) {
            console.log('in user handleUserApiError');
            
            try {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
                
                if (!originalRequest._retry) {
                    originalRequest._retry = true;

                    const refreshToken = localStorage.getItem('userRefreshToken');
    
                    if (!refreshToken) {
                        window.location.href = '/login';
                        return Promise.reject(error);
                    }

                    const response = await axios.post(baseURL + '/auth/user/refresh', { refreshToken });                    

                    localStorage.setItem('userToken', response.data.data.accessToken);
                    localStorage.setItem('userRefreshToken', response.data.data.refreshToken);

                    if (originalRequest.headers instanceof AxiosHeaders) {
                        originalRequest.headers.set('Authorization', `Bearer ${response.data.data.accessToken}`);
                    } else {
                        const headers = new AxiosHeaders();
                        headers.set('Authorization', `Bearer ${response.data.data.accessToken}`);
                        originalRequest.headers = headers;
                    }

                    return axios(originalRequest);
                }
            } catch (refreshError: any) {
                if (refreshError.response?.status === 401) {
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('userRefreshToken');
                    window.location.href = '/login';
                    store.dispatch(logoutUser())
                } else {
                    window.location.href = `/error/${refreshError.response?.status || 500}`;
                }
                console.error('Refresh token error:', refreshError.response?.data || refreshError.message);
                return Promise.reject(refreshError);
            }
        } else {
            window.location.href = `/error/${error.response.status}`;
            console.error('Response error:', error.response.data);
        }
    } else if (error.request) {
        window.location.href = `/error/${error.request.status}`;
        console.error('Request error:', error.request);
    } else {
        window.location.href = "/error/500";
        console.error('Error:', error.message);
    }
    return Promise.reject(error);
}