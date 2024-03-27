import { useEffect, useState } from "react"
import RoundedImageInput from "../common/RoundedImageInput"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { editProfileValidation } from "../../validations/user/profileValidation"
import { notifyError, notifySuccess } from "../../constants/toast"
import { editUserData } from "../../api/user/UserManagment"
import { base64 } from "../../constants/convert"
import { useNavigate } from "react-router-dom"
import { setUserDetails } from "../../store/slice/userSlice"

function EditProfile() {
    const [imageFile,setImageFile] = useState<string | File>()
    const [name,setName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [phone,setPhone] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [userId,setUserId] = useState<string>("")
    const [newPassword,setNewPassword] = useState<string>("")
    const userData = useSelector((state:RootState)=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    useEffect(()=>{
        setName(userData.name)
        setEmail(userData.email)
        setPhone(userData.phone)
        setUserId(userData._id)
    },[])

    const handleSubmit = async() =>{

        const result:string = editProfileValidation({name,email,phone,password,newPassword})
        if(result !== "Success") return notifyError(result)

        let image :string | undefined ;
        if(typeof(imageFile) ==='string'){
            image = imageFile
        }else{
            image = await base64(imageFile)
        }

        const response = await editUserData({_id:userId,name,email,phone,image,password,newPassword})

        if(!response.status) return notifyError(response.message)

        dispatch(setUserDetails({
            _id:response.userData?._id,
            name:response.userData?.name,
            phone:response.userData?.phone,
            email:response.userData?.email,
            image:response.userData?.image
        }))
        
        notifySuccess(response.message)
        navigate('/')
    }


  return (
    <div className="max-w-md mx-auto w-96">
    <div className="relative z-0 w-full mb-5 group ">
        <input type="text" name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={name} onChange={(e)=>setName(e.target.value)} required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
    </div>
    <div className="relative z-0 w-full mb-5 group ">
        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
    </div>
    <div className="relative z-0 w-full mb-5 group ">
        <input type="number" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Phone</label>
    </div>
    <div className="relative z-0 w-full mb-5 group ">
        <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "value={password} onChange={(e)=>setPassword(e.target.value)} />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Current Password</label>
    </div>
    <div className="relative z-0 w-full mb-5 group ">
        <input type="password" name="floating_new_password" id="floating_new_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your New Password</label>
    </div>
    <div className="relative z-0 w-full mb-5 group ">
       <RoundedImageInput state={imageFile} setState={setImageFile} name="Profile"/>
    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>
  </div>
  )
}

export default EditProfile
