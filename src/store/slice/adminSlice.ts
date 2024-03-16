import {createSlice} from '@reduxjs/toolkit'
import { UserData } from '../../types/userTypes'


const initialState:UserData={
    _id:"",
    name:"",
    phone:0,
    email:""
}


const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdminDetails: (state,action)=>{
            state._id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        logoutAdmin :(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = 0

        }
    }
})


export const{setAdminDetails,logoutAdmin} = adminSlice.actions
export default adminSlice.reducer