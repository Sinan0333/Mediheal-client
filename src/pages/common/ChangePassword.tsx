import { useState } from "react"
import { notifyError, notifySuccess } from "../../constants/toast"
import {useLocation, useNavigate, useParams } from "react-router-dom"
import { changeUserPassword } from "../../api/user/auth"
import { ResponseData } from "../../types/commonTypes"
import { changeDoctorPassword } from "../../api/doctor/auth"
import { changeAdminPassword } from "../../api/admin/auth"

function ChangePassword() {
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const {_id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname.split('/')

    const handleSubmit = async()=>{
        if(!password || !confirmPassword){
            return notifyError("Please enter password")
        }else if(password.length < 6){
            return notifyError("Password must be at least 6 characters")
        }else if(confirmPassword.length < 6){
            return notifyError("Password must be at least 6 characters")
        }else if(password !== confirmPassword){
            return notifyError("Password does not match")
        }else if(!_id) return notifyError("Something went wrong")

        if(path.includes("user")){
            const response:ResponseData = await changeUserPassword(_id,password)
            if(response.status){
                notifySuccess(response.message)
                navigate(`/login`)
            }else{
                notifyError(response.message)
            }
        }else if(path.includes("admin")){
            const response:ResponseData = await changeAdminPassword(_id,password)
            if(response.status){
                notifySuccess(response.message)
                navigate(`/admin/login`)
            }else{
                notifyError(response.message)
            }
        }else if(path.includes("doctor")){
            const response:ResponseData = await changeDoctorPassword(_id,password)
            if(response.status){
                notifySuccess(response.message)
                navigate(`/doctor/login`)
            }else{
                notifyError(response.message)
            }
        }else{
            notifyError("Something went wrong")
        }
    }
  return (
    <div className="h-screen flex justify-center items-center ">
        <div className="bg-white w-full sm:w-1/3 ">
            <form className="max-w-sm mx-auto w-full">
                <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password </label>
                <div className="relative w-full">
                    <input type="password"  onChange={(e)=>setPassword(e.target.value)} value={password} className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password"/>
                    <input type="password"  onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Re Enter the password"/>
                </div>
                <div className="flex justify-center mt-4">
                    <button type="button" onClick={handleSubmit}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword
