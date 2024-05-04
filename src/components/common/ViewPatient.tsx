import { useLocation, useParams } from "react-router-dom"
import Label from "../common/Label"
import { useEffect, useState } from "react"
import { PatientData } from "../../types/userTypes"
import { getPatient } from "../../api/admin/patientManagementApi"
import { getPatientApi } from "../../api/doctor/doctorPatient"


function ViewPatient() {

    const [patientData,setPatientData] = useState<PatientData>()
    const imageUrl =patientData?.image ? `https://res.cloudinary.com/dw2cscitl/${patientData?.image}` : "/src/assets/images/default_profile.jpg"
    const dob = patientData?.dob ? new Date(patientData.dob).toLocaleDateString() : ""
    const location = useLocation()
    
    
  
    const {_id} = useParams()
    useEffect(()=>{

      if(location.pathname.split('/').includes('admin')){
        getPatient(_id).then((data)=>{
          setPatientData(data.data)
        }).catch((err)=>{
          console.error(err);
        })
      }else{
        getPatientApi(_id).then((data)=>{
          setPatientData(data.data)
        }).catch((err)=>{
          console.error(err);
        })
      }
    
    },[])


  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen ">
      <div className="flex justify-center">
        <h1 className="text-2xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">{patientData?.firstName+""+patientData?.secondName}</h1>
      </div>
      <div className="flex justify-center">
        <div className="neumorphic-rounded w-56 h-56   items-center  overflow-hidden  rounded-full ">
          <img src={imageUrl} alt="Your Image" className="rounded-full object-cover w-full h-full" />
        </div>
      </div>
      <div className="flex flex-wrap mt-10">
        <Label labelName="First Name" value={patientData?.firstName}/>
        <Label labelName="Second Name" value={patientData?.secondName}/>
        <Label labelName="DOB" value={dob}/>
        <Label labelName="Age" value={patientData?.age}/>
        <Label labelName="Gender" value={patientData?.gender}/>
        <Label labelName="PatientId" value={patientData?.id}/>
      </div>
    </div>
  )
}

export default ViewPatient
