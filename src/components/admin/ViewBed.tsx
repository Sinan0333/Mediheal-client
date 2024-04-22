import { useNavigate, useParams } from "react-router-dom"
import Label from "../common/Label"
import { useEffect, useState } from "react"
import { BedDataType } from "../../types/adminTypes"
import { getBedDetailsApi } from "../../api/admin/bedManagementApi"
import { eye } from "../../constants/icons"

function ViewBed() {
    const [bedData,setBedData] = useState<BedDataType>()
    const {_id} = useParams()
    const navigate = useNavigate()
    const assignDate = bedData?.assignDate ? new Date(bedData.assignDate).toLocaleDateString() : '';
    const dischargeDate = bedData?.dischargeDate ? new Date(bedData.dischargeDate).toLocaleDateString() : '';
    const assignBy = typeof(bedData?.assignBy) === 'object' ? bedData.assignBy.firstName+bedData.assignBy.secondName : ""
    const patientID = typeof(bedData?.patient) === 'object' ? bedData.patient.id : ""
    const patientName = typeof(bedData?.patient) === 'object' ? bedData.patient.firstName +""+bedData.patient.secondName : ""
    
    useEffect(()=>{
      getBedDetailsApi(_id).then((res)=>{
        setBedData(res.data)
      }).catch((err)=>{
        console.error(err);
      })
    },[])
    
    
    return (
      <div className="neumorphic py-2 px-2 ml-6 w-screen ">
        <div className="flex justify-center">
          <h1 className="text-3xl sm:text-3xl md:text-4xl mb-4 font-bold text-adminGold">{patientID ? patientName : bedData?.type }</h1>
        </div>
        <div className="flex flex-wrap mt-10">
          {
            patientID ? (
              <>
              <Label labelName="PatientID" value={patientID}/>
              <button className="neumorphic-navBtn  py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/admin/patients/view/${patientID}`)}>
                <img src={eye} alt="Button Icon"  />
              </button>
              <Label labelName="Patient Name" value={patientName}/>
              <Label labelName="Bed Type" value={bedData?.type}/>
              <Label labelName="Charge" value={bedData?.charge}/>
              <Label labelName="Assign Date" value={assignDate}/>
              <Label labelName="Discharge Date" value={dischargeDate}/>
              <Label labelName="Total" value={bedData?.total || ""}/>
              <Label labelName="Assign By" value={assignBy}/>
              <Label labelName="Status" value={bedData?.available ? "Discharged" : "Admit"}/>
              <Label labelName="Description" value={bedData?.description}/>
              </>
            ) : (
              <>
               <Label labelName="Bed Type" value={bedData?.type}/>
               <Label labelName="Charge" value={bedData?.charge}/>
              </>
            )
          }
         
        </div>
      </div>
    )
}

export default ViewBed
