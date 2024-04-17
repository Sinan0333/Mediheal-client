import { useEffect, useState } from "react"
import ScheduleTable from "./ScheduleTable"
import { DoctorData, OneSlotType, initialDoctorData, initialOneSlotsType } from "../../types/doctorTypes"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { getDoctorDataApi, takeABreakApi } from "../../api/doctor/doctorApi"
import { notifyError, notifySuccess } from "../../constants/toast"
import { ResponseData } from "../../types/commonTypes"
import { cancelBookingWhenBreak } from "../../api/user/appointment"

function ViewSchedule() {
    const [data,setData] = useState<DoctorData>(initialDoctorData)
    const [selectedSlot,setSelectedSlot] = useState<OneSlotType>(initialOneSlotsType)
    const [selectedDay,setSelectedDay] = useState<string>("")
    const doctorId = useSelector((state:RootState)=>state.doctor._id)


    useEffect(()=>{
        getDoctorDataApi(doctorId).then((res)=>{
          setData(res.data)
        }).catch((err)=>{
          console.log(err.message)
        })
      },[])

    const handleTakeBreak = async()=>{

        if(!selectedDay){
            return notifyError("Please select a day")
        }else if(!selectedSlot.startTime || !selectedSlot.endTime){
            return notifyError("Please select a time")
        }

        if(!data.slots._id || !selectedSlot._id) return notifyError("Missing Required fields")
        const response:ResponseData = await takeABreakApi(data.slots._id,selectedDay,selectedSlot._id)
        if(!response.status) notifyError(response.message)

        await cancelBookingWhenBreak(response.data)        
        notifySuccess("Successful")

    }

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen ">
    <div className="flex justify-center">
      <h1 className="text-2xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Schedule Management</h1>
    </div>
    <ScheduleTable slots={data.slots} state={selectedSlot} setState={setSelectedSlot} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
    <div className="flex justify-center mt-8 mb-8 gap-6">
        <button className="bg-adminBlue w-36 h-8 font-semibold text-white rounded-lg hover:bg-adminGreen" onClick={handleTakeBreak}>Take A Break</button>
        <button className="bg-adminBlue w-36 h-8 font-semibold text-white rounded-lg hover:bg-adminGreen" >Take A Leave</button>
      </div>
  </div>
  )
}

export default ViewSchedule
