import {createSlice} from '@reduxjs/toolkit'
import { UserData } from '../../types/userTypes'


const initialState:UserData={
    _id:"",
    name:"",
    phone:"",
    email:"",
    image:"",
    is_blocked:true
}


const doctorSlice = createSlice({
    name:"doctor",
    initialState,
    reducers:{
        setDoctorDetails: (state,action)=>{     
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.is_blocked = action.payload.is_blocked
        },
        logoutDoctor:(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = "",
            state.image = ""
            state.is_blocked=true
        }
    }
})


export const{setDoctorDetails,logoutDoctor} = doctorSlice.actions
export default doctorSlice.reducer