import {createSlice} from '@reduxjs/toolkit'
import { UserData } from '../../types/userTypes'


const initialState:UserData={
    _id:"",
    name:"",
    phone:0,
    email:""
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails: (state,action)=>{
            state._id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },
        logoutDetails :(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = 0

        }
    }
})


export const{setUserDetails,logoutDetails} = userSlice.actions
export default userSlice.reducer