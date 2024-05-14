import { useState } from "react"
import Inputs from "../admin/Inputs"
import RoundedImageInput from "../common/RoundedImageInput"
import { addPatientValidation } from "../../validations/user/PatientValidation"
import { notifyError, notifySuccess } from "../../constants/toast"
import { base64 } from "../../constants/convert"
import { ResponseData } from "../../types/commonTypes"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { AddPatientFormProps } from "../../types/userTypes"
import OldDateInput from "../common/OldDateInput"
import { addPatient } from "../../api/user/patient"

function AddPatientForm({state,setState}:AddPatientFormProps) {
    const [firstName ,setFirstName] = useState("")
    const [secondName,setSecondName] =useState("") 
    const [bloodGroup,setBloodGroup] = useState("")
    const [gender ,setGender] = useState("")
    const [dob,setDob] = useState<Date | string>("")
    const [age,setAge] =useState<number>(0) 
    const [imageFile,setImageFile] = useState<File >()
    const userId = useSelector((state:RootState)=>state.user._id)

    const handleSubmit = async () =>{
        try {
            const result : string = addPatientValidation({firstName,secondName,age,bloodGroup,dob,gender,image:imageFile})
            if(result !== "Success") return notifyError(result)

            let image:string |undefined = ""
            if(imageFile) image = await base64(imageFile)

            const response :ResponseData = await addPatient({userId,firstName,secondName,age,bloodGroup,dob,gender,image})
            if(!response.status) notifyError(response.message)

            notifySuccess(response.message)
            setState(!state)

            setFirstName("")
            setSecondName("")
            setDob("")
            setAge(0)
            setImageFile(undefined)
            
        } catch (error) {
            
        }    }

  return (
    <div className="mt-10 border-2 border-gray-500 p-1">
      <div className="bg-adminBlue p-8 items-center">
        <h1 className="text-2xl text-white font-semibold">Enter Patient Details</h1>
        <h3 className="text-white">You Can Add Patient Or You Can Select A Existing Patient</h3>
      </div>
      <div className="flex flex-wrap m-6 p-2 w-full lg:p-6 ">
        <Inputs name="First Name" type="text" state={firstName} setState={setFirstName}/>
        <Inputs name="Second Name" type="text" state={secondName} setState={setSecondName}/>
        <div className="mb-6 flex w-full md:w-1/2  pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Blood Group</label>
          <select className="block w-full py-2 px-4 bg-transparent border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setBloodGroup(e.target.value)}>
            <option value=''>Select your blood group</option>
            <option value='A+'>A+</option>
            <option value='B+'>B+</option>
            <option value='O+'>O+</option>
            <option value='AB+'>AB+</option>
            <option value='A-'>A-</option>
            <option value='B-'>B-</option>
            <option value='O-'>O-</option>
            <option value='AB-'>AB-</option>
          </select>
        </div>

        <div className="mb-6 flex w-full md:w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Gender</label>
          <select className="block w-full py-2 px-4 bg-transparent border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setGender(e.target.value)}>
          <option value="">Select your gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>other</option>
          </select>
        </div>
        <OldDateInput name="Date of Birth" state={dob} setState={setDob}/>
        <Inputs name="Age" type="number" state={age} setState={setAge}/>
        <RoundedImageInput name="Image" state={imageFile} setState={setImageFile}/>
      </div>
      <div className="flex justify-center mb-6">
        <button className="bg-adminBlue text-white rounded-full w-24 h-8 font-semibold" onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  )
}

export default AddPatientForm