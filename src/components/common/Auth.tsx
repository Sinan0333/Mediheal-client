import authValidation from "../../validations/common/authValidation"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { success,error} from "../../constants/toast"
import {AuthProps} from "../../types/commonTypes"
import { userSignup } from "../../api/user/auth"


function Auth({pageName,signupInputs,checkBox,changePage}:AuthProps) {
    const [name,setName] = useState<string>("")
    const [phone,setPhone] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const navigate = useNavigate()

    const  handleSubmit =async ()=>{
        console.log(phone);
        
        if(pageName == 'Signup'){
            const result:string = authValidation({name,phone,email,password})
            if(result === 'Success'){
                const number = parseInt(phone)
                await userSignup({name,number,email,password})
                success(result)
            }else{
                error(result)
            }
        }else{
            const result:string = authValidation({email,password})
            if(result === 'Success'){
                toast.success(result)
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
                <input type="radio" className="form-radio text-blue-500" name="radio" defaultChecked/>
                <span className="ml-2">Admin</span>
            </label>
            <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio text-blue-500" name="radio" />
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
        <p className='float-left'>{changePage}<span onClick={()=>pageName ==='Login'? navigate('/signup'):navigate('/login') } className='text-blue-700 cursor-pointer'>{pageName === 'Signup' ? 'login' : 'signup'}</span></p>
    </div>
  )
}

export default Auth