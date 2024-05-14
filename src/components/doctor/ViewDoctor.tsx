import { useNavigate, useParams } from "react-router-dom"
import Label from "../common/Label"
import { useEffect, useState } from "react"
import { DoctorData, ViewDoctorProps,  } from "../../types/doctorTypes"
import { getDoctorDataApi } from "../../api/admin/doctorManagementApi"

function ViewDoctor({upBtn}:ViewDoctorProps) {
  const [doctorData,setDoctorData] = useState<DoctorData>()
  const imageUrl = `https://res.cloudinary.com/dw2cscitl/${doctorData?.image}`
  const [dob,setDob] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (doctorData && typeof doctorData.dob === 'string') {
      const dobString = new Date(doctorData.dob).toLocaleDateString('en-US');
      setDob(dobString);
    }
  },[doctorData]);
  

  const {_id} = useParams()
  useEffect(()=>{
    getDoctorDataApi(_id).then((data)=>{
      setDoctorData(data.data)
    }).catch((err)=>{
      console.error(err);
    })
  },[])
  
  
  return (
    <div className="neumorphic py-2 px-2 w-screen min-h-screen lg:ml-64">
      <div className="flex justify-center">
        <h1 className="text-2xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">{doctorData?.firstName+""+doctorData?.secondName}</h1>
      </div>
      <div className="flex justify-center">
        <div className="neumorphic-rounded w-56 h-56 flex  items-center overflow-hidden  rounded-full ">
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
      {
        upBtn? <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={()=>navigate(`/doctor/profile/edit/${_id}`)}>Update</button>
    </div> : ""
      }
    </div>
  )
}

export default ViewDoctor
