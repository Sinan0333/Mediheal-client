import { useParams } from "react-router-dom"
import Label from "../common/Label"
import { useEffect, useState } from "react"
import { BedDataType } from "../../types/adminTypes"
import { getBedDetailsApi } from "../../api/admin/bedApi"

function ViewBed() {
    const [bedData,setBedData] = useState<BedDataType>()
    const {_id} = useParams()
    const assignDate = bedData?.assignDate ? new Date(bedData.assignDate).toLocaleDateString() : '';
    const dischargeDate = bedData?.dischargeDate ? new Date(bedData.dischargeDate).toLocaleDateString() : '';
    const assignBy = typeof(bedData?.assignBy) === 'object' ? bedData.assignBy.firstName+bedData.assignBy.secondName : ""
    const PatientID = typeof(bedData?.patient) === 'object' ? bedData.patient._id : ""
    
    useEffect(()=>{
      getBedDetailsApi(_id).then((res)=>{
        setBedData(res.data)
      }).catch((err)=>{
        console.error(err);
      })
    },[])
    
    
    return (
      <div className="neumorphic py-2 px-2 ml-6 w-screen ">
        <div className="flex flex-wrap mt-10">
          <Label labelName="PatientID" value={PatientID}/>
          <Label labelName="Bed Type" value={bedData?.type}/>
          <Label labelName="Description" value={bedData?.description}/>
          <Label labelName="Assign Date" value={assignDate}/>
          <Label labelName="Discharge Date" value={dischargeDate}/>
          <Label labelName="Total" value={bedData?.total || ""}/>
          <Label labelName="Assign By" value={assignBy}/>
          <Label labelName="Available" value={bedData?.available ? "Discharged" : "Admit"}/>
        </div>
      </div>
    )
}

export default ViewBed
