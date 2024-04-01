import { useEffect, useState } from "react"
import ExistingPatientCard from "./ExistingPatientCard"
import { PatientData } from "../../types/userTypes"
import { getUserPatientsApi } from "../../api/user/Patient"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function ExistingPatient() {
    const [list ,setList] = useState<PatientData[]>()
    const userId = useSelector((state:RootState)=>state.user._id)

    useEffect(()=>{
        getUserPatientsApi(userId).then((res)=>{
            setList(res.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])


  return (
    <div className="mt-10 border-2 border-gray-500 p-1">
    <div className="bg-adminBlue p-8 items-center">
      <h1 className="text-2xl text-white font-semibold">Choose Patient</h1>
      <h3 className="text-white">Choose Existing Or Added Patient</h3>
    </div>
    <div className="flex flex-wrap  justify-evenly pt-8 pl-4">  
    {
        list?.map((patient)=>{
            console.log(patient);
            
            return(
                <ExistingPatientCard data={patient}/>
            )
        }) 
    }
    </div>
  </div>
  )
}

export default ExistingPatient
