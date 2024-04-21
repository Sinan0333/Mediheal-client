import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { editProfileValidation } from "../../validations/user/profileValidation"
import { notifyError, notifySuccess } from "../../constants/toast"
import { editUserData } from "../../api/user/UserManagment"
import { base64 } from "../../constants/convert"
import { useNavigate } from "react-router-dom"
import { setUserDetails } from "../../store/slice/userSlice"
import UserImageInput from "./UserImageInput"

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
        if(userData.image) setImageFile(`https://res.cloudinary.com/dw2cscitl/${userData.image}`)
        else setImageFile('/src/assets/images/default_profile.jpg') 
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
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">{userData.name}</h2>

                <div className="grid max-w-2xl mx-auto mt-8">
                    <UserImageInput state={imageFile} setState={setImageFile} name="image"/>
                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="name"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                Name</label>
                            <input type="email" id="email" value={name}
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="your.email@mail.com" onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="email"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                email</label>
                            <input type="email" id="email" value={email}
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="your.email@mail.com"  onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="email"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                Phone</label>
                            <input type="email" id="email" value={phone}
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="your.email@mail.com" onChange={(e)=>setPhone(e.target.value)} />
                        </div>

                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="email"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                Old Password</label>
                            <input type="email" id="email"
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="you old password (optional)" onChange={(e)=>setPassword(e.target.value)} />
                        </div>

                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="email"
                                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your
                                New Password</label>
                            <input type="email" id="email"
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                placeholder="your new password (optional)" onChange={(e)=>setNewPassword(e.target.value)} />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit"
                                className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800" onClick={handleSubmit}>Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default EditProfile
