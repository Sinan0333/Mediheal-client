import { useEffect, useState } from "react"
import Inputs from "./Inputs"
import { notifyError, notifySuccess } from "../../constants/toast"
import { ResponseData } from "../../types/commonTypes"
import { useNavigate, useParams } from "react-router-dom"
import { editBedValidation } from "../../validations/admin/bedValidation"
import { getBedDetailsApi, updateBedApi } from "../../api/admin/bedApi"
import { unblockedDoctors } from "../../api/doctor/doctorApi"
import { DoctorCardProps } from "../../types/doctorTypes"
import { convertDateToHumanReadable, convertHumanReadableToDate } from "../../constants/convert"

function EditBed() {
    const [type ,setType] = useState<string>("")
    const [charge,setCharge] = useState<number>(0)
    const [patient,setPatient] = useState<string>("")
    const [assignDate,setAssignDate] = useState<Date | string>(new Date())
    const [dischargeDate,setDischargeDate] = useState<Date | string>(new Date())
    const [description,setDescription] = useState<string>("")
    const [assignBy,setAssignBy] = useState<string>("")
    const [available,setAvailable] = useState<boolean>(false)
    const [doctors,setDoctors] = useState<DoctorCardProps[]>()
    const [doctorName,setDoctorName] = useState<string>("")

    const navigate = useNavigate()
    const {_id} = useParams()

    useEffect(()=>{
        unblockedDoctors().then((data)=>{
            setDoctors(data.data)
        }).catch((err)=>{
            console.log(err.message);
        })

        getBedDetailsApi(_id).then((res)=>{
            setType(res.data.type)
            setCharge(res.data.charge)
            setPatient(res.data.patient._id)
            setAssignDate(convertDateToHumanReadable(res.data.assignDate))
            setDischargeDate(convertDateToHumanReadable(res.data.dischargeDate))
            setDescription(res.data.description)
            setDoctorName(res.data.assignBy.firstName)
            setAssignBy(res.data.assignBy._id)
            setAvailable(res.data.available)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

    async function handleSubmit() {
  
      let newAssignDate;
      if(typeof(assignDate)==='object') newAssignDate = assignDate
      else newAssignDate = convertHumanReadableToDate(assignDate)

      let newDischargeDate;
      if(typeof(dischargeDate)==='object') newDischargeDate = dischargeDate
      else newDischargeDate = convertHumanReadableToDate(dischargeDate)

      const validation: string = editBedValidation({ type,charge,patient,assignBy,assignDate:newAssignDate,dischargeDate:newDischargeDate,description,});
      if (validation !== "Success") return notifyError(validation);
  
      try {
        
        if(_id){
            const response:ResponseData =await updateBedApi(_id,{type,charge,patient,assignBy,assignDate:newAssignDate,dischargeDate,available,description})
            if(!response.status) return notifyError(response.message)
            notifySuccess(response.message)
            navigate('/admin/bed')
        }
        
  
      } catch (error) {
        console.error(error);
        notifyError("Error occurred while converting images.");
      }
    }
    
  
    return (
      <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Edit Bed</h1>
        <div className="mb-6 flex flex-wrap">
            {patient && <Inputs name="PatientId" type="text" setState={setPatient} state={patient}/>}
            <Inputs name="Assign Date" type="date" setState={setAssignDate} state={assignDate}/>
            <Inputs name="Discharge Date" type="date" setState={setDischargeDate} state={dischargeDate}/>
            <Inputs name="Description" type="text" setState={setDescription} state={description}/>
            <div className="mb-6 flex w-1/2 pr-4">
            <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Assign By</label>
            <select className="block w-full py-2 px-4 bg-transparent border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setAssignBy(e.target.value)}>
                <option value={assignBy}>{doctorName}</option>
               {
                doctors?.map((doc)=>{
                    return(
                        <option value={doc._id}>{doc.firstName} {doc.secondName}</option>
                    )
                })
               }
            </select>
            </div>
            <div className="mb-6 flex w-1/2 pr-4">
                <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Bed Type</label>
                <select className="block w-full py-2 px-4 bg-transparent border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setType(e.target.value)}>
                <option value={type}>{type}</option>
                    <option value='ICU'>ICU</option>
                    <option value='ward'>Ward</option>
                    <option value='Ac'>Ac</option>
                    <option value='Non Ac'>Non Ac</option>
                    <option value='Covid 19'>Covid 19</option>
                    <option value='Cabin'>Cabin</option>
                </select>
            </div>
            <Inputs name="Charge" type="number" setState={setCharge} state={charge}/>
            {
                available ? <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={()=>setAvailable(!available)}>Admit</button>
                :<button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>setAvailable(!available)}>Discharge</button>
            }
        </div>
        <div className="flex justify-center">
          <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )
}

export default EditBed
