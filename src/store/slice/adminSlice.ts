import {createSlice} from '@reduxjs/toolkit'
import { UserData } from '../../types/userTypes'


const initialState:UserData={
    _id:"",
    name:"",
    phone:"",
    email:"",
    image:""
}


const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdminDetails: (state,action)=>{
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.image = action.payload.image
        },
        logoutAdmin :(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = ""
            state.image = ""
        }
    }
})


export const{setAdminDetails,logoutAdmin} = adminSlice.actions
export default adminSlice.reducer