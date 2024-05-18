import { useEffect, useState } from "react"
import ScheduleTable from "./ScheduleTable"
import { DoctorData, OneSlotType, initialDoctorData, initialOneSlotsType } from "../../types/doctorTypes"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import {  getProfileData, removeBreakApi, takeABreakApi } from "../../api/doctor/doctorApi"
import { notifyError, notifySuccess } from "../../constants/toast"
import { ResponseData } from "../../types/commonTypes"
import { cancelBookingWhenBreak } from "../../api/doctor/doctorAppointmentApi"

function ViewSchedule() {
    const [data,setData] = useState<DoctorData>(initialDoctorData)
    const [selectedSlot,setSelectedSlot] = useState<OneSlotType>(initialOneSlotsType)
    const [selectedDay,setSelectedDay] = useState<string>("")
    const doctorId = useSelector((state:RootState)=>state.doctor._id)
    const [reload,setReload] = useState(false)

    useEffect(()=>{
        getProfileData(doctorId).then((res)=>{
          setData(res.data)
        }).catch((err)=>{
          console.log(err.message)
        })
      },[reload])

    const handleTakeBreak = async()=>{

        if(!selectedDay){
            return notifyError("Please select a day and time")
        }else if(!selectedSlot.startTime || !selectedSlot.endTime){
            return notifyError("Please select a time")
        }

        if(!data.slots._id || !selectedSlot._id) return notifyError("Missing Required fields")
        const response:ResponseData = await takeABreakApi(data.slots._id,selectedDay,selectedSlot._id)
        if(!response.status) notifyError(response.message)

        await cancelBookingWhenBreak(response.data)        
        notifySuccess("Successful")
        setReload(!reload)
    }

    const handleRemoveBreak = async()=>{

      if(!selectedDay){
          return notifyError("Please select a day and time")
      }else if(!selectedSlot.startTime || !selectedSlot.endTime){
          return notifyError("Please select a time")
      }

      if(!data.slots._id || !selectedSlot._id) return notifyError("Missing Required fields")
      const response:ResponseData = await removeBreakApi(data.slots._id,selectedDay,selectedSlot._id)
      if(!response.status) notifyError(response.message)
     
      notifySuccess("Successful")
      setReload(!reload)
  }

  return (
  <div className="neumorphic py-2 px-2 w-screen min-h-screen lg:ml-64">
    <div className="flex justify-center">
      <h1 className="text-2xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Schedule Management</h1>
    </div>
    <div className="flex mt-10">
       <div className="flex items-center mr-4">
            <div className="rounded-full w-2 h-2 bg-yellow-400 mr-2"></div>
            <p>Your taken a break</p>
       </div>
       <div className="flex items-center mr-4">
            <div className="rounded-full w-2 h-2 bg-green-500 mr-2"></div>
            <p>Slot Is Reserved</p>
       </div>
       <div className="flex items-center">
            <div className="rounded-full w-2 h-2 bg-black mr-2"></div>
            <p>Free</p>
       </div>
    </div>
    
    <ScheduleTable slots={data.slots} state={selectedSlot} setState={setSelectedSlot} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
    <div className="flex justify-center mt-8 mb-8 gap-6">
      {
        selectedSlot.break 
        ? <button className="bg-adminBlue w-36 h-8 font-semibold text-white rounded-lg hover:bg-adminGreen" onClick={handleRemoveBreak}>Remove Break</button> 
        : <button className="bg-adminBlue w-36 h-8 font-semibold text-white rounded-lg hover:bg-adminGreen" onClick={handleTakeBreak}>Take A Break</button>
      }
    </div>
  </div>
  )
}

export default ViewSchedule
