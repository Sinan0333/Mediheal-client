import authValidation from "../../validations/common/authValidation"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { notifySuccess,notifyError} from "../../constants/toast"
import {AuthProps} from "../../types/commonTypes"
import { userLogin, userSignup } from "../../api/user/auth"
import { adminLogin } from "../../api/admin/auth"
import { doctorLogin } from "../../api/doctor/auth"


function Auth({pageName,signupInputs,checkBox,changePage}:AuthProps) {
    const [name,setName] = useState<string>("")
    const [phone,setPhone] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [role,setRole] = useState<string | undefined>()
    const navigate = useNavigate()

    const  handleSubmit =async ()=>{
        
        if(pageName == 'Signup'){
            const result:string = authValidation({name,phone,email,password})
            if(result === 'Success'){
                
                await userSignup({name,phone,email,password})
                notifySuccess(result)
            }else{
                notifyError(result)
            }
        }else{
            const result:string = authValidation({email,password})
            if(result === 'Success'){
                if(!role){
                    userLogin({email,password})
                    notifySuccess(result)
                }else if(role == "admin"){
                    adminLogin({email,password})
                    notifySuccess(result)
                }else if(role == 'doctor'){
                    doctorLogin({email,password})
                    notifySuccess(result)
                }else{
                    notifyError("Role error")
                }
            }else{
                toast.error(result)
            }
        }   
    }

  return (
    <div className="neumorphic-auth absolute  top-8 sm:top-16 left-4 sm:left-11 mx-auto sm:mx-0 p-11 items-center flex flex-col" style={{ maxWidth: '500px' }}>
        <p className='text-4xl mb-6 font-bold'>{pageName}</p>
        <input className={`neumorphic-input-auth mb-4 m-2 outline-none ${signupInputs}`} placeholder="Name" type="text"  onChange={(e)=>setName(e.target.value)} value={name}/>
        <input className={`neumorphic-input-auth mb-4 m-2 outline-none ${signupInputs}`} placeholder="Phone" type="number" onChange={(e)=>setPhone(e.target.value)} value={phone}/>
        <input className={`neumorphic-input-auth mb-4 m-2 outline-none`} placeholder="Email" type="email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input className={`neumorphic-input-auth mb-4 m-2 outline-none`} placeholder="Password" type="password" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        {pageName === 'Login' ? <p className='text-blue-600 cursor-pointer'>Forgot Password</p> :""}
        <div className= {`${checkBox}`}>
            <label className="inline-flex items-center">
                <input type="radio" className="form-radio text-blue-500" name="role" value={"admin"} defaultChecked   checked={role === 'admin' || undefined } onChange={(e)=>setRole(e.target.value)}/>
                <span className="ml-2">Admin</span>
            </label>
            <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio text-blue-500" name="role" value={"doctor"} checked={role === 'doctor'} onChange={(e)=>setRole(e.target.value)}/>
                <span className="ml-2">Doctor</span>
            </label>
        </div>
        <div className='neumorphic-auth mt-4 cursor-pointer  top-8 sm:top-16 left-4 sm:left-11 mx-auto sm:mx-0 p-4 items-center flex flex-col hover:bg-blue-500 hover:text-white'style={{maxWidth:'500px',width:'450px'}} onClick={handleSubmit}>
            <p className='text-xl font-bold'>{pageName}</p>
        </div>
        <br />
        or
        <div className='flex items-center justify-center cursor-pointer'>
            <img style={{width:'40px', paddingTop:'5px'}} src="src/assets/icons/icons8-google-48.png" alt="Google" />
            <p className='pl-5 font-bold '>Signup  with Google</p>
        </div>
        <br /> 
        {changePage !=""?<p className='float-left'>{changePage}<span onClick={()=>pageName ==='Login'? navigate('/signup'):navigate('/login') } className='text-blue-700 cursor-pointer'>{pageName === 'Signup' ? 'login' : 'signup'}</span></p>:""}
    </div>
  )
}

export default Auth