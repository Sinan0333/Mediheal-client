import { useNavigate } from "react-router-dom"
import { listDepartmentApi } from "../../api/admin/departmentApi"
import { base64 } from "../../constants/convert"
import { notifyError, notifySuccess } from "../../constants/toast"
import { DepartmentApiType } from "../../types/adminTypes"
import { ResponseData, days } from "../../types/commonTypes"
import { addDoctorValidation } from "../../validations/admin/addDoctorValidation"
import RoundedImageInput from "../common/RoundedImageInput"
import Inputs from "./Inputs"
import { useEffect, useState } from "react"
import { addDoctor } from "../../api/doctor/doctorApi"


function AddDoctorForm() {
  const [workingDays,setWorkingDays] = useState([""])
  const [firstName,setFirstName] = useState<string>()
  const [secondName,setSecondName] = useState<string>()
  const [dob,setDob] = useState<Date>()
  const [age,setAge] = useState<number>()
  const [gender,setGender] = useState<string>()
  const [address,setAddress] = useState<string>()
  const [experience,setExperience] = useState<number>()
  const [phone,setPhone] = useState<number>()
  const [email,setEmail] = useState<string>()
  const [password,setPassword] = useState<string>()
  const [department,setDepartment] = useState<string>()
  const [imageFile,setImageFile] = useState()
  const [departmentList,setDepartmentList] = useState<DepartmentApiType[]>([])
  const navigate = useNavigate()

  useEffect(()=>{
    listDepartmentApi().then((data:ResponseData)=>{
      if(data.status) setDepartmentList(data.data)
      else notifyError(data.message)
    }).catch((err)=>{
      console.log(err.message);
    })
  },[])

  const handleSubmit = async()=>{
    try {
      const result :string = addDoctorValidation({firstName,secondName,dob,age,gender,address,experience,phone,email,password,department,workingDays,image:imageFile})

      if(result !=="Success") return notifyError(result)

      const image:string | undefined = await base64(imageFile)

      if(firstName && secondName && dob && age && gender && address && experience && phone && email && password && department && workingDays && image){
        const response:ResponseData = await addDoctor({firstName,secondName,dob,age,gender,address,experience,phone,email,password,department,workingDays,image})
        if(!response.status) return notifyError(response.message)
        console.log(response.data);
        
        notifySuccess(response.message)
        navigate('/admin/doctors')
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
    <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold text-adminGold">Add Doctor</h1>
    <div className=" flex flex-wrap">
        <Inputs name="First Name" type="text" setState={setFirstName} state={firstName}/>
        <Inputs name="Second Name" type="text"  setState={setSecondName} state={secondName}/>
        <Inputs name="DOB" type="date" setState={setDob} state={dob}/>
        <Inputs name="Age" type="number" setState={setAge} state={age}/>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Gender</label>
          <select className="block w-full py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setGender(e.target.value)}>
          <option value=""></option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>other</option>
          </select>
        </div>
        <Inputs name="Address" type="text" setState={setAddress} state={address}/>
        <Inputs name="Experience" type="number" setState={setExperience} state={experience}/>
        <Inputs name="Phone" type="number" setState={setPhone} state={phone}/>
        <Inputs name="Email" type="email" setState={setEmail} state={email}/>
        <Inputs name="Password" type="password" setState={setPassword} state={password}/>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Department</label>
          <select className="block w-full py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setDepartment(e.target.value)}>
          <option value=''></option>
            {
              departmentList.map((department)=>{
                return(
                  <option key={department._id} value={department._id}>{department.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Working Days</label>
          <select className="block w-full py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setWorkingDays([...workingDays,e.target.value])}>
          <option value=''>{workingDays.join(',')}</option>
            {
              days.map((day)=>{
                if(!workingDays.includes(day)){
                  return(
                    <option key={day} value={day}>{day}</option>
                  )
                }
              })
            }
          </select>
        </div>
        <RoundedImageInput state={imageFile} setState={setImageFile} name="image"/>
    </div>
    <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
    </div>

  </div>
  )
}

export default AddDoctorForm
