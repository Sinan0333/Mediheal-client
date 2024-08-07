import { useEffect, useState } from "react"
import Inputs from "./Inputs"
import { notifyError, notifySuccess } from "../../constants/toast"
import { ResponseData } from "../../types/commonTypes"
import { useNavigate, useParams } from "react-router-dom"
import { editBedValidation } from "../../validations/admin/bedValidation"
import { dischargePatientApi, getBedDetailsApi, updateBedApi, updateBedTypeAndCharge } from "../../api/admin/bedManagementApi"
import { DoctorCardProps } from "../../types/doctorTypes"
import { convertDateToHumanReadable, convertHumanReadableToDate } from "../../constants/convert"
import NewDateInput from "../common/NewDateInput"
import { unblockedDoctors } from "../../api/admin/doctorManagementApi"
import ConfirmationModal from "./ConfirmationModal"

function EditBed() {
    const [type ,setType] = useState<string>("")
    const [charge,setCharge] = useState<number>(0)
    const [patient,setPatient] = useState<string>("")
    const [assignDate,setAssignDate] = useState<Date | string>("")
    const [dischargeDate,setDischargeDate] = useState<Date | string>("")
    const [description,setDescription] = useState<string>("")
    const [assignBy,setAssignBy] = useState<string>("")
    const [isBlocked,setIsBlocked] = useState<boolean>(false)
    const [available,setAvailable] = useState<boolean>(true)
    const [doctors,setDoctors] = useState<DoctorCardProps[]>()
    const [doctorName,setDoctorName] = useState<string>("")
    const [isConfirmationOpen,setIsConfirmationOpen] = useState<boolean>(false)

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
            setAvailable(res.data.available)
            setIsBlocked(res.data.is_Blocked)
            if(res.data.patient){
                setPatient(res.data.patient.id)
                setAssignDate(convertDateToHumanReadable(res.data.assignDate))
                setDischargeDate(convertDateToHumanReadable(res.data.dischargeDate))
                setDescription(res.data.description)
                setDoctorName(res.data.assignBy.firstName + res.data.assignBy.secondName)
                setAssignBy(res.data.assignBy._id)
            }
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

    async function handleDischarge(){
        const response:ResponseData = await dischargePatientApi(_id)
        if(!response.status) return notifyError(response.message)
        notifySuccess(response.message)
        navigate('/admin/bed')
    }

    async function handleSubmit() {
     try{  
        if(!_id) return notifyError("Something wrong") 
        if(patient){
            let newAssignDate;
            if(typeof(assignDate)==='object') newAssignDate = assignDate
            else newAssignDate = convertHumanReadableToDate(assignDate)
      
            let newDischargeDate;
            if(typeof(dischargeDate)==='object') newDischargeDate = dischargeDate
            else newDischargeDate = convertHumanReadableToDate(dischargeDate)
      
            const validation: string = editBedValidation({ type,charge,patient,assignBy,assignDate:newAssignDate,dischargeDate:newDischargeDate,description});
            if (validation !== "Success") return notifyError(validation);

            const response:ResponseData = await updateBedApi(_id,{type,charge,patient,assignBy,assignDate:newAssignDate,dischargeDate,available,description})
            if(!response.status) return notifyError(response.message)
            notifySuccess(response.message)
            navigate('/admin/bed')

        }else{
            const response:ResponseData = await updateBedTypeAndCharge(_id,type,charge,isBlocked)
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
      <div className="neumorphic py-2 px-2 w-screen min-h-screen pl-4 pt-4 lg:ml-64">
        {
            isConfirmationOpen ? <ConfirmationModal isConfirmationModalOpen={isConfirmationOpen} setIsConfirmationModalOpen={setIsConfirmationOpen} onConfirm={handleDischarge} message={"Are you sure you want to discharge this patient?"}/> : null
        }
        <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Edit Bed</h1>
        <div className="mb-6 flex flex-wrap">
            {patient && <Inputs name="PatientId" type="text" setState={setPatient} state={patient}/>}
            {assignDate && <NewDateInput name="Assign Date" setState={setAssignDate} state={assignDate}/>}
            {dischargeDate && <NewDateInput name="Discharge Date" setState={setDischargeDate} state={dischargeDate}/>}
            {description && <Inputs name="Description" type="text" setState={setDescription} state={description}/>}
            {assignBy && <div className="mb-6 flex w-full md:w-1/2 pr-4">
            <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Assign By</label>
            <select className="block w-full py-2 px-4 bg-transparent border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setAssignBy(e.target.value)}>
                <option value={assignBy}>{doctorName}</option>
               {
                doctors?.map((doc)=>{
                    return(
                        <option key={doc._id} value={doc._id}>{doc.firstName} {doc.secondName}</option>
                    )
                })
               }
            </select>
            </div>}
            <div className="mb-6 flex w-full md:w-1/2 pr-4">
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
                available ? "" :<button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>setIsConfirmationOpen(!isConfirmationOpen)}>Discharge</button>
            }
        </div>
        <div className="flex justify-center">
          <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )
}

export default EditBed
