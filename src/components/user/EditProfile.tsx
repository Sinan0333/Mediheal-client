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
            image:response.userData?.image,
            is_blocked:response.userData?.is_blocked
        }))
        
        notifySuccess(response.message)
        navigate('/')
    }


  return (
    <div className="flex-1   h-full max-w-md mx-auto md:mx-0 md:mr-6  dark:bg-zinc-70">
    <h2 className="text-xl font-semibold mb-6">Update Profile</h2>
      <div className="mb-4">
        <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="name">Name :</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className="mb-4">
        <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="email">Email :</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className="mb-4">
        <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="phone">Phone :</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Your phone number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      </div>
      <div className="mb-4">
        <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="old-password">Old Password :</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="old-password" type="password" placeholder="Your old password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      <div className="mb-4">
        <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="new-password">New Password :</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="new-password" type="password" placeholder="Your new password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
      </div>
      <div className="mb-6">
        <RoundedImageInput state={imageFile} setState={setImageFile} name="Profile"/>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
  </div>
  )
}

export default EditProfile
