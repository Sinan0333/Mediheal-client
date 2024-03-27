import {createSlice} from '@reduxjs/toolkit'
import { UserData } from '../../types/userTypes'


const initialState:UserData={
    _id:"",
    name:"",
    phone:"",
    email:"",
    image:""
}


const doctorSlice = createSlice({
    name:"doctor",
    initialState,
    reducers:{
        setDoctorDetails: (state,action)=>{
            console.log(action);
            
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        logoutDoctor:(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = "",
            state.image = ""

        }
    }
})


export const{setDoctorDetails,logoutDoctor} = doctorSlice.actions
export default doctorSlice.reducer