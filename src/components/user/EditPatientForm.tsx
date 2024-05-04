import { useEffect, useState } from "react"
import Inputs from "../admin/Inputs"
import RoundedImageInput from "../common/RoundedImageInput"
import { addPatientValidation } from "../../validations/user/PatientValidation"
import { notifyError, notifySuccess } from "../../constants/toast"
import { base64, convertDateToHumanReadable } from "../../constants/convert"
import { ResponseData } from "../../types/commonTypes"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import OldDateInput from "../common/OldDateInput"
import { editPatientData, getPatientData } from "../../api/user/patient"
import { useNavigate, useParams } from "react-router-dom"

function EditPatientForm() {
    const [firstName ,setFirstName] = useState("")
    const [secondName,setSecondName] =useState("") 
    const [bloodGroup,setBloodGroup] = useState("")
    const [gender ,setGender] = useState("")
    const [dob,setDob] = useState<Date | string>("")
    const [age,setAge] =useState<number>(0) 
    const [imageFile,setImageFile] = useState<string | File >()
    const userId = useSelector((state:RootState)=>state.user._id)
    const {_id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!_id) return notifyError("Something wrong")
        getPatientData(_id).then((res)=>{
            setFirstName(res.data.firstName)
            setSecondName(res.data.secondName)
            setAge(res.data.age)
            setBloodGroup(res.data.bloodGroup)
            setGender(res.data.gender)
            setImageFile(res.data.image)
            const date = convertDateToHumanReadable(res.data.dob)
            setDob(date)
        })
    },[])

    const handleSubmit = async () =>{
        try {
            const result : string = addPatientValidation({firstName,secondName,age,bloodGroup,dob,gender,image:imageFile})
            if(result !== "Success") return notifyError(result)

            let image :string | undefined ;
            if(typeof(imageFile) ==='string'){
                image = imageFile
            }else{
                image = await base64(imageFile)
            }

            if(!_id) return notifyError("Something wrong")
            const response :ResponseData = await editPatientData(_id,{userId,firstName,secondName,age,bloodGroup,dob,gender,image})
            if(!response.status) notifyError(response.message)

            notifySuccess(response.message)
            navigate(-1)
            
        } catch (error) {
            console.log(error);
        }    }

  return (
    <div className="mt-10 border-2 border-gray-500 p-1">
      <div className="flex flex-wrap m-6 p-6">
        <Inputs name="First Name" type="text" state={firstName} setState={setFirstName}/>
        <Inputs name="Second Name" type="text" state={secondName} setState={setSecondName}/>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Blood Group</label>
          <select className="block w-full py-2 px-4 bg-transparent border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setBloodGroup(e.target.value)}>
            <option value={bloodGroup}>{bloodGroup}</option>
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

        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Gender</label>
          <select className="block w-full py-2 px-4 bg-transparent border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setGender(e.target.value)}>
          <option value={gender}>{gender}</option>
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

export default EditPatientForm
