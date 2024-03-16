import {configureStore} from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import adminSlice from './slice/adminSlice'
import doctorSlice from './slice/doctorSlice'


const Store = configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice,
        doctor:doctorSlice
    }
})

export default Store