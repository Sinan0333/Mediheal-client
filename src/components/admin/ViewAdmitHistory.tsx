import { useNavigate, useParams } from "react-router-dom"
import Label from "../common/Label"
import { useEffect, useState } from "react"
import { AdmitHistoryData, } from "../../types/adminTypes"
import { eye } from "../../constants/icons"
import { getAdmitHistoryDetailsApi } from "../../api/admin/admitHistoryApi"

function ViewAdmitHistory() {
    const [admitHistory,setAdmitHistory] = useState<AdmitHistoryData>()
    const {_id} = useParams()
    const navigate = useNavigate()
    const assignDate = admitHistory?.assignDate ? new Date(admitHistory.assignDate).toLocaleDateString() : '';
    const dischargeDate = admitHistory?.dischargeDate ? new Date(admitHistory.dischargeDate).toLocaleDateString() : '';
    const assignBy = typeof(admitHistory?.assignBy) === 'object' ? admitHistory.assignBy.firstName+admitHistory.assignBy.secondName : ""
    const patientID = typeof(admitHistory?.patient) === 'object' ? admitHistory.patient.id : ""
    const patientName = typeof(admitHistory?.patient) === 'object' ? admitHistory.patient.firstName +""+admitHistory.patient.secondName : ""
    
    useEffect(()=>{
      getAdmitHistoryDetailsApi(_id).then((res)=>{
        setAdmitHistory(res.data)
      }).catch((err)=>{
        console.error(err);
      })
    },[])
    
    
    return (
      <div className="neumorphic py-2 px-2 min-h-screen w-screen lg:ml-64">
        <div className="flex justify-center">
          <h1 className="text-3xl sm:text-3xl md:text-4xl mb-4 font-bold text-adminGold">{patientID ? patientName : admitHistory?.type }</h1>
        </div>
        <div className="flex flex-wrap mt-10">
            <div className="md:flex  w-full md:w-1/2">
                <Label labelName="PatientID" value={patientID}/>
                <button className="neumorphic-navBtn  py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/admin/patients/view/${admitHistory?.patient._id}`)}>
                    <img src={eye} alt="Button Icon"  />
                </button>
            </div>
            <Label labelName="Patient Name" value={patientName}/>
            <Label labelName="BedID" value={admitHistory?.bedId}/>
            <Label labelName="Bed Type" value={admitHistory?.type}/>
            <Label labelName="Charge" value={admitHistory?.charge}/>
            <Label labelName="Assign Date" value={assignDate}/>
            <Label labelName="Discharge Date" value={dischargeDate}/>
            <Label labelName="Total" value={admitHistory?.total || ""}/>
            <Label labelName="Assign By" value={assignBy}/>
            <Label labelName="Description" value={admitHistory?.description}/>
        </div>
      </div>
    )
}

export default ViewAdmitHistory
