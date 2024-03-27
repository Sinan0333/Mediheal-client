import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Navigate, Outlet } from "react-router-dom"

export function AdminIsLoggedIn() {

    const adminId = useSelector((state:RootState)=>state.admin._id)

  return (
    adminId ? <Outlet/>: <Navigate to='/admin/login'/> 
  )
}


export function AdminIsLoggedOut() {

    const adminId = useSelector((state:RootState)=>state.admin._id)

    return (
      adminId ? <Navigate to='/admin/dashboard'/> : <Outlet/>
    )
}


export function UserIsLoggedIn() {

    const userId = useSelector((state:RootState)=>state.user._id)

    return (
      userId ? <Outlet/>: <Navigate to='/login'/> 
    )
}


export function UserIsLoggedOut() {

    const userId = useSelector((state:RootState)=>state.user._id)

    return (
        userId ? <Navigate to='/home'/> : <Outlet/>
    )
}


export function DoctorIsLoggedIn() {

    const doctorId = useSelector((state:RootState)=>state.doctor._id)

    return (
        doctorId ? <Outlet/>: <Navigate to='/doctor/login'/> 
    )
}


export function DoctorIsLoggedOut() {

    const doctorId = useSelector((state:RootState)=>state.doctor._id)

    return (

        doctorId ? <Navigate to='/doctor/patients'/> : <Outlet/>

    )
}