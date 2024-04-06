import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDoctorDataApi } from "../../api/doctor/doctorApi"
import { DoctorData, OneSlotType, initialDoctorData, initialOneSlotsType,} from "../../types/doctorTypes"
import { ResponseData, days } from "../../types/commonTypes"
import SlotsTable from "./SlotsTable"
import AddPatientForm from "./AddPatientForm"
import ExistingPatient from "./ExistingPatient"
import { bookNowApi } from "../../api/user/Patient"
import { bookNowValidation } from "../../validations/user/appointmentValidation"
import { notifyError, notifySuccess } from "../../constants/toast"


function DoctorDetails() {
  const [data,setData] = useState<DoctorData>(initialDoctorData)
  const [selectedSlot,setSelectedSlot] = useState<OneSlotType>(initialOneSlotsType)
  const [selectedPatient,setSelectedPatient] = useState<string>("")
  const [selectedDay,setSelectedDay] = useState<string>("")
  const [imageUrl,setImageUrl] = useState<string>("")
  const {_id}= useParams()
  let selectedDays: string[] = []
  const currentDate = new Date()
  const currentDayOfWeek = currentDate.getDay()
  
  for (let i = 0; i < data?.workingDays.length; i++) {
    const index = data.workingDays[i];
    if (index >= 0 && index < days.length) {
      selectedDays.push(days[index]);
    }
  }

  useEffect(()=>{
    getDoctorDataApi(_id).then((res)=>{
      setData(res.data)
      setImageUrl(`https://res.cloudinary.com/dw2cscitl/${res.data.image}`)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])

  async function handleSubmit(type:"Online" | "Offline"){

    const result:string = bookNowValidation({startTime:selectedSlot.startTime,endTime:selectedSlot.endTime,patient:selectedPatient,day:selectedDay,doctor:"",status:"Pending",type})
    if(result != "Success") return notifyError(result)

   const response:ResponseData = await bookNowApi({startTime:selectedSlot.startTime,endTime:selectedSlot.endTime,day:selectedDay,status:"Pending",doctor:_id,patient:selectedPatient,type})
   if(!response.status) notifyError(response.message)
   notifySuccess(response.message)
    
  }

  
  return (
    <div className="pl-32 pt-20 pr-32">
      <div >
        <h1 className="text-4xl  font-semibold text-adminBlue">{data.firstName} {data.secondName}</h1>
      </div>
      <div className="flex ">
        <div className="mt-8 w-72 h-98 flex  justify-center overflow-hidden   ">
          <img src={imageUrl} alt="Your Image" className="object-cover" />
        </div>
        <div className="flex-wrap mt-10 ml-10">
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Full Name:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{data.firstName} {data.secondName}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Department:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{data.department.name}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Gender:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{data.gender}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Age:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{data.age}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Experience:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{data.experience}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Working Days:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{selectedDays.join(",")}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Working Time:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{data.schedule.startTime}-{data.schedule.endTime}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Fees:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{data.fees}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Status:</label>
            <label className="font-bold text-lg w-36  text-adminGreen">{data.workingDays.includes(currentDayOfWeek) ? "Available" : "Unavailable"}</label>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex justify-center">
          <h1 className="font-bold text-3xl text-adminBlue" >Make An Appointment</h1>
        </div>
        <SlotsTable slots={data.slots} state={selectedSlot} setState={setSelectedSlot} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
        <AddPatientForm/>
        <ExistingPatient state={selectedPatient} setState={setSelectedPatient}/>
      </div>
      <div className="flex justify-center mt-8 mb-8 gap-6">
        <button className="bg-adminBlue w-36 h-8 font-semibold text-white rounded-lg hover:bg-adminGreen" onClick={()=>handleSubmit("Online")}>Book For Online</button>
        <button className="bg-adminBlue w-36 h-8 font-semibold text-white rounded-lg hover:bg-adminGreen" onClick={()=>handleSubmit("Offline")}>Book For Offline</button>
      </div>
    </div>
  )
}

export default DoctorDetails

