import {createSlice} from '@reduxjs/toolkit'
import { UserData } from '../../types/userTypes'


const initialState:UserData={
    _id:"",
    name:"",
    phone:"",
    email:"",
    image:""
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
            state.image = action.payload.image
        },
        logoutDetails :(state)=>{
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = ""

        }
    }
})


export const{setUserDetails,logoutDetails} = userSlice.actions
export default userSlice.reducer