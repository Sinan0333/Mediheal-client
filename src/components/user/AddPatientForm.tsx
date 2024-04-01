import { useState } from "react"
import Inputs from "../admin/Inputs"
import RoundedImageInput from "../common/RoundedImageInput"

function AddPatientForm() {
    const [firstName ,setFirstName] = useState("")
    const [secondName,setSecondName] =useState("") 
    const [BloodGrp,setBloodGrp] = useState("")
    const [gender ,setGender] = useState("")
    const [dob,setDob] = useState<Date | string>("")
    const [age,setAge] =useState<number>(0) 
    const [image,setImage] = useState<File | string>("")
  return (
    <div className="mt-10 border-2 border-gray-500 p-1">
      <div className="bg-adminBlue p-8 items-center">
        <h1 className="text-2xl text-white font-semibold">Enter Patient Details</h1>
        <h3 className="text-white">You Can Add Patient Or You Can Select A Existing Patient</h3>
      </div>
      <div className="flex flex-wrap m-6 p-6">
        <Inputs name="First Name" type="text" state={firstName} setState={setFirstName}/>
        <Inputs name="Second Name" type="text" state={secondName} setState={setSecondName}/>
        <Inputs name="Blood Group" type="text" state={BloodGrp} setState={setBloodGrp}/>
        <Inputs name="Gender" type="text" state={gender} setState={setGender}/>
        <Inputs name="Date Of Birth" type="date" state={dob} setState={setDob}/>
        <Inputs name="Age" type="number" state={age} setState={setAge}/>
        <RoundedImageInput name="Image" state={image} setState={setImage}/>
      </div>
      <div className="flex justify-center mb-6">
        <button className="bg-adminBlue text-white rounded-full w-24 h-8 font-" >Submit</button>
    </div>
    </div>
  )
}

export default AddPatientForm