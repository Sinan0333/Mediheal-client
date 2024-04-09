import { useNavigate,useParams } from "react-router-dom"
import { unblockedDepartments } from "../../api/admin/departmentApi"
import { base64, convertDateToHumanReadable, convertHumanReadableToDate } from "../../constants/convert"
import { notifyError, notifySuccess } from "../../constants/toast"
import { DepartmentApiType } from "../../types/adminTypes"
import { ResponseData, days } from "../../types/commonTypes"
import { editDoctorValidation } from "../../validations/admin/doctorValidation"
import RoundedImageInput from "../common/RoundedImageInput"
import Inputs from "../admin/Inputs"
import { useEffect, useReducer, useState } from "react"
import { editDoctorDataApi, getDoctorDataApi } from "../../api/doctor/doctorApi"
import { initSchedule, scheduleReducer } from "../../reducers/scheduleReducer"


function EditDoctor() {

  const [workingDays,setWorkingDays] = useState<number[]>([])
  const [firstName,setFirstName] = useState<string>("")
  const [secondName,setSecondName] = useState<string>("")
  const [dob,setDob] = useState<Date | string>("")
  const [age,setAge] = useState<number>(0)
  const [gender,setGender] = useState<string>("")
  const [address,setAddress] = useState<string>("")
  const [experience,setExperience] = useState<number>(0)
  const [phone,setPhone] = useState<number>(0)
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [department,setDepartment] = useState<string>("")
  const [departmentName,setDepartmentName] = useState<string>("")
  const [imageFile,setImageFile] = useState<string | File>()
  const [fees,setFees] = useState<number>(0)
  const [schedule,setSchedule] = useReducer(scheduleReducer,initSchedule)
  const [departmentList,setDepartmentList] = useState<DepartmentApiType[]>([])
  const navigate = useNavigate()
  const {_id} =useParams()
  let selectedDays: string[] = []

  for (let i = 0; i < workingDays.length; i++) {
    const index = workingDays[i];
    if (index >= 0 && index < days.length) {
      selectedDays.push(days[index]);
    }
  }

  useEffect(()=>{  
    getDoctorDataApi(_id).then((data)=>{
     setFirstName(data.data.firstName)
     setSecondName(data.data.secondName)
     setAge(data.data.age)
     setGender(data.data.gender)
     setAddress(data.data.address)
     setExperience(data.data.experience)
     setPhone(data.data.phone)
     setEmail(data.data.email)
     setPassword(data.data.password)
     setDepartment(data.data.department._id)
     setDepartmentName(data.data.department.name)
     setImageFile(data.data.image)
     setFees(data.data.fees)
     setWorkingDays(data.data.workingDays)
     setSchedule({type:"SET_START_TIME",payload:data.data.schedule.startTime})
     setSchedule({type:"SET_END_TIME",payload:data.data.schedule.endTime})
     setSchedule({type:"SET_INTERVAL",payload:data.data.schedule.interval})
     const date = convertDateToHumanReadable(data.data.dob)
     setDob(date)
    }).catch((err)=>{
      console.error(err);
    })
  },[])

  useEffect(()=>{
    unblockedDepartments().then((data:ResponseData)=>{
      if(data.status) setDepartmentList(data.data)
      else notifyError(data.message)
    }).catch((err)=>{
      console.log(err.message);
    })
  },[])

  const handleSubmit = async()=>{
    try {

      let dateOfBirth;
      if(typeof(dob)==='object') dateOfBirth = dob
      else dateOfBirth = convertHumanReadableToDate(dob)
        
      if(!imageFile) return notifyError("Please Select add image")
      const result :string = editDoctorValidation({firstName,secondName,dob:dateOfBirth,age,gender,address,experience,phone,email,password,department,workingDays,schedule,fees,image:imageFile})
      if(result !=="Success") return notifyError(result)

      let image :string | undefined ;
      if(typeof(imageFile) ==='string'){
        image = imageFile
      }else{
        image = await base64(imageFile)
      }
        if(!image) return notifyError("Couldn't convert the image")
        const response:ResponseData = await editDoctorDataApi({firstName,secondName,dob:dateOfBirth,age,gender,address,experience,phone,email,password,department,workingDays,schedule,fees,image},_id)
        if(!response.status) return notifyError(response.message)
        console.log(response.data);
        
        notifySuccess(response.message)
        navigate(-1)
  

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
    <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold text-adminGold">Edit Doctor</h1>
    <div className=" flex flex-wrap">
        <Inputs name="First Name" type="text" setState={setFirstName} state={firstName}/>
        <Inputs name="Second Name" type="text"  setState={setSecondName} state={secondName}/>
        <Inputs name="DOB" type="date" setState={setDob} state={"2024-03-06"}/>
        <Inputs name="Age" type="number" setState={setAge} state={age}/>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Gender</label>
          <select className="block w-full py-2 px-4 bg-transparent border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setGender(e.target.value)}>
          <option value={gender}>{gender}</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>other</option>
          </select>
        </div>
        <Inputs name="Address" type="text" setState={setAddress} state={address}/>
        <Inputs name="Experience" type="number" setState={setExperience} state={experience}/>
        <Inputs name="Phone" type="number" setState={setPhone} state={phone}/>
        <Inputs name="Email" type="email" setState={setEmail} state={email}/>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Department</label>
          <select className="block w-full py-2 px-4 bg-transparent border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setDepartment(e.target.value)}>
          <option value={department}>{departmentName}</option>
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
          <select className="block w-full py-2 px-4 bg-transparent border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setWorkingDays([...workingDays,parseInt(e.target.value)])}>
          <option value={selectedDays}>{selectedDays.join(',')}</option>
            {
              days.map((day,i)=>{
                if(!workingDays.includes(days.indexOf(day))){
                  return(
                    <option key={day} value={i}>{day}</option>
                  )
                }
              })
            }
          </select>
        </div>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">Starting Time</label>
          <input className=" flex-grow h-8 py-2 px-4 bg-transparent border-transparent focus:outline-none" type="number"  value={schedule.startTime} placeholder={`Enter Starting time`} onChange={(e)=> setSchedule({type:"SET_START_TIME",payload:parseInt(e.target.value)})}/>
        </div>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">Ending Time</label>
          <input className=" flex-grow h-8 py-2 px-4 bg-transparent border-transparent focus:outline-none" type="number"  value={schedule.endTime} placeholder={`Enter Ending time`} onChange={(e)=> setSchedule({type:"SET_END_TIME",payload:parseInt(e.target.value)})}/>
        </div>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">Interval</label>
          <input className=" flex-grow h-8 py-2 px-4 bg-transparent border-transparent focus:outline-none" type="number"  value={schedule.interval} placeholder={`Enter Ending interval`} onChange={(e)=> setSchedule({type:"SET_INTERVAL",payload:parseInt(e.target.value)})}/>
        </div>
        <Inputs name="Fees" type="number" setState={setFees} state={fees}/>
        <RoundedImageInput state={imageFile} setState={setImageFile} name="image"/>
    </div>
    <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
    </div>

  </div>
  )
}

export default EditDoctor
