import authValidation from "../../validations/common/authValidation"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { notifySuccess,notifyError} from "../../constants/toast"
import {AuthProps} from "../../types/commonTypes"
import { userLogin, userSignup } from "../../api/user/auth"
import { adminLogin } from "../../api/admin/auth"
import { doctorLogin } from "../../api/doctor/auth"
import { SignupResponse } from "../../types/userTypes"
import { setUserDetails } from "../../store/slice/userSlice"
import { useDispatch } from "react-redux"
import { setAdminDetails } from "../../store/slice/adminSlice"
import { setDoctorDetails } from "../../store/slice/doctorSlice"
import { DoctorAuthResponse } from "../../types/doctorTypes"                             


function Auth({pageName,role,signupInputs,changePage}:AuthProps) {
    const [name,setName] = useState<string>("")
    const [phone,setPhone] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const  handleSubmit =async ()=>{
        
        if(pageName == 'Signup'){
            const result:string = authValidation({name,phone,email,password})
            if(result === 'Success'){
                const response:SignupResponse = await userSignup({name,phone,email,password})
                if(response.status){
                    navigate(`/otp/${response.userData?._id}`)
                }else{
                    notifyError(response.message)
                }   
            }else{
                notifyError(result)
            }
        }else{
            const result:string = authValidation({email,password})
            if(result === 'Success'){
                if(role ==='user' ){
                    const response:SignupResponse =await userLogin({email,password})
                    if(response.status){
                        dispatch(setUserDetails({
                            _id:response.userData?._id,
                            name:response.userData?.name,
                            phone:response.userData?.phone,
                            email:response.userData?.email,
                            image:response.userData?.image,
                            is_blocked:response.userData?.is_blocked
                        }))
                        if(response.token){
                            localStorage.setItem("userToken",response.token)
                        }
                        notifySuccess(response.message)
                        navigate('/')
                    }else{
                        notifyError(response.message)
                    }
                }else if(role == "admin" ){
                    const response:SignupResponse =await adminLogin({email,password})
                    if(response.status){
                        dispatch(setAdminDetails({
                            _id:response.userData?._id,
                            name:response.userData?.name,
                            phone:response.userData?.phone,
                            email:response.userData?.email,
                            image:response.userData?.image,
                            is_blocked:response.userData?.is_blocked
                        }))
                        if(response.token){
                            localStorage.setItem("adminToken",response.token)
                        }
                        notifySuccess(result)
                        navigate('/admin')
                    }else{
                        notifyError(response.message)
                    }
                }else if(role == 'doctor'){
                    
                    const response:DoctorAuthResponse = await doctorLogin({email,password})
                    if(response.status){
                        console.log(response.userData);
                        
                        dispatch(setDoctorDetails({
                            _id:response.userData?._id,
                            name:response.userData?.firstName,
                            phone:response.userData?.phone,
                            email:response.userData?.email,
                            is_blocked:response.userData?.is_blocked
                        }))
                        if(response.token){
                            localStorage.setItem("doctorToken",response.token)
                        }
                        notifySuccess(result)
                        navigate('/doctor')
                    }else{
                        notifyError(response.message)
                    }
                }else{
                    notifyError("Please select your role")
                }
            }else{
                notifyError(result)
            }
        }   
    }

  return (
    <div className="flex justify-center items-center  h-screen w-screen">
    <div className="neumorphic-auth md:absolute  top-8 sm:top-16 left-4 sm:left-11 mx-auto sm:mx-0 p-11 items-center flex flex-col max-w-[500px] w-[90%] " >
        <p className='text-4xl mb-6 font-bold'>{pageName}</p>
        <input className={`neumorphic-input-auth mb-4 m-2 outline-none border-none w-full ${signupInputs}`} placeholder="Name" type="text"  onChange={(e)=>setName(e.target.value)} value={name}/>
        <input className={`neumorphic-input-auth mb-4 m-2 outline-none border-none w-full ${signupInputs}`} placeholder="Phone" type="number" onChange={(e)=>setPhone(e.target.value)} value={phone}/>
        <input className={`neumorphic-input-auth mb-4 m-2 outline-none border-none w-full` } placeholder="Email" type="email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input className={`neumorphic-input-auth mb-4 m-2 outline-none border-none w-full`} placeholder="Password" type="password" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        {pageName === 'Login' ? <p className='text-blue-600 cursor-pointer'>Forgot Password</p> :""}
        <div className='neumorphic-auth mt-4 cursor-pointer  top-8 sm:top-16 left-4 sm:left-11 mx-auto sm:mx-0 p-4 items-center flex flex-col hover:bg-blue-500 hover:text-white max-w-[500px] w-full' onClick={handleSubmit}>
            <p className='text-xl font-bold'>{pageName}</p>
        </div>
        <br />
        {/* or
        <div className='flex items-center justify-center cursor-pointer'>
            <img style={{width:'40px', paddingTop:'5px'}} src="/src/assets/icons/icons8-google-48.png" alt="Google" />
            <p className='pl-5 font-bold '>Signup  with Google</p>
        </div> */}
        <br /> 
        {changePage !=""?<p className='float-left'>{changePage}<span onClick={()=>pageName ==='Login'? navigate('/signup'):navigate('/login') } className='text-blue-700 cursor-pointer'>{pageName === 'Signup' ? 'login' : 'signup'}</span></p>:""}
    </div>
    </div>
  )
}

export default Auth