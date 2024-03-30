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


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails: (state,action)=>{
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.image = action.payload.image;
            state.is_blocked = action.payload.is_blocked
        },
        logoutUser :(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = "",
            state.is_blocked = true

        }
    }
})


export const{setUserDetails,logoutUser} = userSlice.actions
export default userSlice.reducer