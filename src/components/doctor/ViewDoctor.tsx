import { useParams } from "react-router-dom"
import Label from "../common/Label"
import { useEffect, useState } from "react"
import { getDoctorDataApi } from "../../api/doctor/doctorApi"
import { DoctorData } from "../../types/doctorTypes"

function ViewDoctor() {
  const [doctorData,setDoctorData] = useState<DoctorData>()
  const imageUrl = `https://res.cloudinary.com/dw2cscitl/${doctorData?.image}`
  const [dob,setDob] = useState("")

  useEffect(() => {
    if (doctorData && typeof doctorData.dob === 'string') {
      const dobString = new Date(doctorData.dob).toLocaleDateString('en-US');
      setDob(dobString);
    }
  }, [doctorData]);
  

  const {_id} =useParams()
  useEffect(()=>{
    getDoctorDataApi(_id).then((data)=>{
      setDoctorData(data.data)
    }).catch((err)=>{
      console.error(err);
    })
  },[])
  
  
  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen ">
      <div className="flex justify-center">
        <h1 className="text-2xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">{doctorData?.firstName+""+doctorData?.secondName}</h1>
      </div>
      <div className="flex justify-center">
        <div className="neumorphic-rounded w-56 h-56 flex justify-center items-center overflow-hidden">
          <img src={imageUrl} alt="Your Image" className="rounded-full object-cover" />
        </div>
      </div>
      <div className="flex flex-wrap mt-10">
        <Label labelName="First Name" value={doctorData?.firstName}/>
        <Label labelName="Second Name" value={doctorData?.secondName}/>
        <Label labelName="DOB" value={dob}/>
        <Label labelName="Age" value={doctorData?.age}/>
        <Label labelName="Gender" value={doctorData?.gender}/>
        <Label labelName="Experience" value={doctorData?.experience}/>
        <Label labelName="Phone" value={doctorData?.phone}/>
        <Label labelName="Email" value={doctorData?.email}/>
        <Label labelName="Department" value={doctorData?.department.name}/>
        <Label labelName="Fees" value={doctorData?.fees}/>
      </div>
    </div>
  )
}

export default ViewDoctor
