import {  useLocation, useNavigate, useParams } from "react-router-dom"
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { notifyError } from "../../constants/toast"
import { useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function VideoCall() {
    const location = useLocation()
    const navigate = useNavigate()
    const {doctorId,userId} = useParams()
    const [userName,setUserName] = useState("user")
    const [uniqueId,setUniqueId] = useState("")
    const doctorData = useSelector((state:RootState)=>state.doctor)
    const userData = useSelector((state:RootState)=>state.user)


    useLayoutEffect(()=>{
        if(location.pathname.split('/').includes('doctor')){
            if(doctorId !== doctorData._id){
                navigate('/doctor/dashboard')
            }else{
                setUserName(doctorData.name)
                setUniqueId(doctorData._id)
            }
        }else{
            if(userId !== userData._id){
                navigate('/home')
            }else{
                setUserName(userData.name)
                setUniqueId(userData._id)
            }
        }
    },[])


    const meeting = async (element:any)=>{
      if(!doctorId || !userId) return notifyError("Something Wrong")
      const appID = parseInt(import.meta.env.VITE_ZEGOCLOUD_API_ID)
      const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, doctorId+userId, uniqueId,  userName);
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container:element,
        scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall
        },
        showScreenSharingButton:false,
      })
    }

  return (
  <>
     {
        uniqueId ?  <div className="" style={{ width: '100vw', height: '100vh' }} ref={meeting}></div> : ""
     }
 </>
  )
}
export default VideoCall
