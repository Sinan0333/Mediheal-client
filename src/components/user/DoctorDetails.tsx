import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDoctorDataApi } from "../../api/doctor/doctorApi"
import { DoctorData, initialDoctorData } from "../../types/doctorTypes"
import { days } from "../../types/commonTypes"
import SlotsTable from "./SlotsTable"
import AddPatientForm from "./AddPatientForm"
import ExistingPatient from "./ExistingPatient"


function DoctorDetails() {
  const [data,setData] = useState<DoctorData>(initialDoctorData)
  const [selectedSlot,setSelectedSlot] = useState<string>("")
  const [selectedPatient,setSelectedPatient] = useState<string>("")
  const {_id}= useParams()
  const imageUrl = `https://res.cloudinary.com/dw2cscitl/${data?.image}`;
  let selectedDays: string[] = []
  const currentDate = new Date()
  const currentDayOfWeek = currentDate.getDay()
  console.log(selectedPatient);
  
  
  for (let i = 0; i < data?.workingDays.length; i++) {
    const index = data.workingDays[i];
    if (index >= 0 && index < days.length) {
      selectedDays.push(days[index]);
    }
  }

  useEffect(()=>{
    getDoctorDataApi(_id).then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])

  
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
        <SlotsTable slots={data.slots} state={selectedSlot} setState={setSelectedSlot}/>
        <AddPatientForm/>
        <ExistingPatient state={selectedPatient} setState={setSelectedPatient}/>
      </div>
    </div>
  )
}

export default DoctorDetails

