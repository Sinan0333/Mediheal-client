import { days } from "../../types/commonTypes"
import Inputs from "./Inputs"
import { useState } from "react"

function AddDoctorForm() {
  const [WorkingDays,setWorkilnDays] = useState([""])
  const [firstName,setFirstName] = useState<string>()
  const [lastName,setLastName] = useState<string>()
  const [dob,setDob] = useState<Date>()
  const [age,setAge] = useState<number>()
  const [gender,setGender] = useState<string>()
  const [address,setAddress] = useState<string>()
  const [experience,setExperience] = useState<number>()
  const [phone,setPhone] = useState<number>()
  const [email,setEmail] = useState<number>()
  const [department,setDepartment] = useState<number>()
  const [image,setImage] = useState<string>()

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
    <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold text-adminGold">Add Doctor</h1>
    <div className=" flex flex-wrap">
        <Inputs name="First Name" type="text" setState={setFirstName} state={firstName}/>
        <Inputs name="Second Name" type="text" setState={setLastName} state={lastName}/>
        <Inputs name="DOB" type="date" setState={setDob} state={dob}/>
        <Inputs name="Age" type="number" setState={setAge} state={age}/>
        <Inputs name="Gender" type="text" setState={setGender} state={gender}/>
        <Inputs name="Address" type="text" setState={setAddress} state={address}/>
        <Inputs name="Experience" type="number" setState={setExperience} state={experience}/>
        <Inputs name="Phone" type="number" setState={setPhone} state={phone}/>
        <Inputs name="Email" type="email" setState={setEmail} state={email}/>
        <Inputs name="Department" type="text" setState={setDepartment} state={department}/>
        {/* <Inputs name="Working Days" type="text"/> */}
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Working Days</label>
          <select className="block w-full py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setWorkilnDays([...WorkingDays,e.target.value])}>
            {
              days.map((day)=>{
                if(!WorkingDays.includes(day)){
                  return(
                    <option value={day}>{day}</option>
                  )
                }
              })
            }
          </select>
        </div>
        <Inputs name="Image" type="file" setState={setImage} state={image}/>
    </div>
    <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" >Submit</button>
    </div>

  </div>
  )
}

export default AddDoctorForm
