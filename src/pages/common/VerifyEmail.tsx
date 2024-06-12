import { useState } from "react"
import { notifyError, notifySuccess } from "../../constants/toast"
import { verifyEmail } from "../../api/user/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyAdminEmail } from "../../api/admin/auth";
import { verifyDoctorEmail } from "../../api/doctor/auth";

const emailPattern : RegExp =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


function VerifyEmail() {
    const [email,setEmail] = useState("")
    const location = useLocation()
    const pathArray = location.pathname.split("/")
    const navigate = useNavigate()

    const handleSubmit = async( ) =>{
        if(!email){
            notifyError("Please Enter Email")
        } else if(!email.match(emailPattern)){
            notifyError("Please Enter Valid Email")
        }else{
           if(pathArray.includes("user")){
               const response = await verifyEmail(email)
               if(!response.status){
                   notifyError(response.message)
               }else{
                   notifySuccess(response.message)
                   navigate(`/user/otp/${response.data._id}`)

               }
           }else if(pathArray.includes("admin")){
               const response = await verifyAdminEmail(email)
               if(!response.status){
                   notifyError(response.message)
               }else{
                    notifySuccess(response.message)
                    navigate(`/admin/otp/${response.data._id}`)
               }
           }else if(pathArray.includes("doctor")){
               const response = await verifyDoctorEmail(email)
               if(!response.status){
                   notifyError(response.message)
               }else{
                    notifySuccess(response.message)
                    navigate(`/doctor/otp/${response.data._id}`)
               }
           }
        }
    }
  return (
    <div className="h-screen flex justify-center items-center ">
        <div className="bg-white w-full sm:w-1/3 ">
            <form className="max-w-sm mx-auto w-full">
                <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email For Verification</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                    </div>
                    <input type="text" id="email-address-icon" onChange={(e)=>setEmail(e.target.value)} value={email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com"/>
                </div>
                <div className="flex justify-center mt-4">
                    <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default VerifyEmail
