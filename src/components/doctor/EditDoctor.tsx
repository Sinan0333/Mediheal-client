import { useNavigate,useParams } from "react-router-dom"
import { unblockedDepartments } from "../../api/admin/departmentManagementApi"
import { base64, convertDateToHumanReadable, convertHumanReadableToDate } from "../../constants/convert"
import { notifyError, notifySuccess } from "../../constants/toast"
import { DepartmentApiType } from "../../types/adminTypes"
import { ResponseData, days } from "../../types/commonTypes"
import { editDoctorValidation } from "../../validations/admin/doctorValidation"
import RoundedImageInput from "../common/RoundedImageInput"
import Inputs from "../admin/Inputs"
import { useEffect, useReducer, useState } from "react"
import { initSchedule, scheduleReducer } from "../../reducers/scheduleReducer"
import OldDateInput from "../common/OldDateInput"
import { editDoctorDataApi, getDoctorDataApi } from "../../api/admin/doctorManagementApi"


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
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const {_id} =useParams()

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

  const handleWorkingDays = (day:number)=>{
    if(workingDays.includes(day)){
      setWorkingDays(workingDays.filter((d)=>d!==day))
    }else{
      setWorkingDays([...workingDays,day])
    }
  }

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
        <OldDateInput name="Date of Birth" setState={setDob} state={dob}/>
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
        <div className="mb-6 flex relative  w-1/2 pr-4">
          <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">Working Days</label>
          <button onClick={()=>setIsOpen(!isOpen)} className="text-black  focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
            Click to select days
            <svg className={`w-2.5 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute z-10 ml-40 w-48 bg-[#e0e0e0] drop-shadow-xl divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 top-full mt-1">
              <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                {
                  days.map((day,i)=>{
                    return(
                      <li key={day}>
                        <div className="flex items-center">
                          <input id="checkbox-item-1" type="checkbox" value={i} checked={workingDays.includes(days.indexOf(day))} onChange={(e)=>handleWorkingDays(parseInt(e.target.value))} className="neumorphic-navBtn w-4 h-4 text-adminBlue bg-gray-100 border-gray-300 rounded  focus:outline-none focus:ring-0"/>
                          <label htmlFor="checkbox-item-1" className="ms-2 text-sm font-medium  text-gray-900 dark:text-gray-300">{day}</label>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )}
        </div>
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">Starting Time</label>
          <input className="flex-grow h-8 py-2 px-4 bg-transparent border-transparent focus:outline-none" type="number"  value={schedule.startTime} placeholder={`Enter Starting time`} onChange={(e)=> setSchedule({type:"SET_START_TIME",payload:parseInt(e.target.value)})}/>
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
