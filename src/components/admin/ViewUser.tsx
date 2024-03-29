import { useParams } from "react-router-dom"
import Label from "../common/Label"
import { useEffect, useState } from "react"
import { getUserDataApi } from "../../api/user/UserManagment"
import { UserData } from "../../types/userTypes"


function ViewUser() {
    const [userData,setUserData] = useState<UserData>()
    const imageUrl:string = `https://res.cloudinary.com/dw2cscitl/${userData?.image}`
    const defaultProfile:string = '/src/assets/images/default_profile.jpg'
    const {_id} = useParams()

    console.log(userData);
    
    useEffect(()=>{
      getUserDataApi(_id).then((data)=>{
        setUserData(data.data)
      }).catch((err)=>{
        console.error(err);
      })
    },[])
    
    
    return (
      <div className="neumorphic py-2 px-2 ml-6 w-screen ">
        <div className="flex justify-center">
          <h1 className="text-2xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">{userData?.name}</h1>
        </div>
        <div className="flex justify-center">
          <div className="neumorphic-rounded w-56 h-56 flex justify-center items-center overflow-hidden">
            <img src={userData?.image ? imageUrl :defaultProfile} alt="Your Image" className="rounded-full object-cover" />
          </div>
        </div>
        <div className="flex flex-wrap mt-10">
          <Label labelName="Name" value={userData?.name}/>
          <Label labelName="Email" value={userData?.email}/>
          <Label labelName="Phone" value={userData?.phone}/>
        </div>
      </div>
    )
}

export default ViewUser
