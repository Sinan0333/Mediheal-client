import { useReducer, useState } from "react";
import { add, bin } from "../../constants/icons"
import { Diagnosis, Medicines } from "../../types/doctorTypes";
import { initialMedicine, medicineReducer } from "../../reducers/medicineReducer";
import { addDiagnosisValidation, addMedicineValidation, addPrescriptionValidation } from "../../validations/doctor/addPrescriptionValidation";
import { notifyError } from "../../constants/toast";
import { diagnosisReducer, initialDiagnosis } from "../../reducers/diagnosisReducer";
import { addPrescription } from "../../api/doctor/doctorPrescripton";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ResponseData } from "../../types/commonTypes";

function AddPrescription() {

  const [weight,setWeight]=useState<number>(0);
  const [height,setHeight]=useState<number>(0);
  const [bloodPressure,setBloodPressure]=useState<number>(0);
  const [bodyTemperature,setBodyTemperature] = useState<number>(0);
  const [medicine,setMedicine] = useReducer(medicineReducer,initialMedicine)
  const [listMedicines,setListMedicines] = useState<Medicines[]>([]);
  const [diagnosis,setDiagnosis] = useReducer(diagnosisReducer,initialDiagnosis)
  const [listDiagnosis,setListDiagnosis] = useState<Diagnosis[]>([]);
  const doctorId = useSelector((state:RootState)=>state.doctor._id)
  const {patId,_id} = useParams()
  const navigate = useNavigate()

  const addMedicine = ()=>{
    const result:string = addMedicineValidation(medicine)
    if(result !== 'Success') return notifyError(result)

    setListMedicines([...listMedicines,medicine])
    setMedicine({type:"RESET_MEDICINE"})
  }

  const addDiagnosis = ()=>{
    const result:string = addDiagnosisValidation(diagnosis)
    if(result !== 'Success') return notifyError(result) 

    setListDiagnosis([...listDiagnosis,diagnosis])
    setDiagnosis({type:"RESET_DIAGNOSIS"})
  }

  const handleSubmit = async()=>{
    const result:string = addPrescriptionValidation({weight,height,bloodPressure,bodyTemperature})
    if(result !== 'Success') return notifyError(result)

    if(!_id || !patId) return notifyError("Id is missing")
    const response:ResponseData = await addPrescription({patient:patId,appointment:_id,doctor:doctorId,bloodPressure,height,weight,bodyTemperature,medicines:listMedicines,diagnosis:listDiagnosis})
  
    if(!response.status) notifyError(response.message)
    navigate("/doctor/appointments")
  }
    
  return (
    <div className="neumorphic py-2 px-2 w-screen min-h-screen pl-4 pt-4 lg:ml-64">
    <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold text-adminGold">Add Prescription</h1>
    <div className="flex flex-wrap">
        <div className="mb-6 flex w-1/2 xl:w-1/4 pr-4">
          <label className="font-semibold text-lg w-16 mr-4 text-adminBlue">Weight:</label>
          <input className="flex-grow h-8 py-2 px-4 w-32 bg-transparent border-transparent focus:outline-none" type="number" value={weight}  placeholder="In Kg" onChange={(e)=>setWeight(parseInt(e.target.value))}/>
        </div>
        <div className="mb-6 flex w-1/2 xl:w-1/4 pr-4">
          <label className="font-semibold text-lg w-16 mr-4 text-adminBlue">Height:</label>
          <input className="flex-grow h-8 py-2 px-4 w-32 bg-transparent border-transparent focus:outline-none" type="number" value={height}  placeholder="in Cm" onChange={(e)=>setHeight(parseInt(e.target.value))}/>
        </div>
        <div className="mb-6 flex w-1/2 xl:w-1/4 pr-4">
          <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">Blood Pressure:</label>
          <input className="flex-grow h-8 py-2 px-4 w-32 bg-transparent border-transparent focus:outline-none" type="number" value={bloodPressure }  placeholder="in mmHg" onChange={(e)=>setBloodPressure(parseInt(e.target.value))}/>
        </div>
        <div className="mb-6 flex w-1/2 xl:w-1/4 pr-4">
          <label className="font-semibold text-lg w-52 mr-4 text-adminBlue">Body Temperature</label>
          <input className="flex-grow h-8 py-2 px-4 w-32 bg-transparent border-transparent focus:outline-none" type="number" value={bodyTemperature}  placeholder="in Celsius" onChange={(e)=>setBodyTemperature(parseInt(e.target.value))}/>
        </div > 
        
        <table className="w-full mt-4 ">
            <thead className="neumorphic-navBtn text-left w-full h-10 mt-3">
                <tr >
                    <th className="text-adminBlue font-semibold text-lg w-[25%] rounded-l-3xl pl-4">Medicine Name</th>
                    <th className="text-adminBlue font-semibold text-lg w-[25%">Type</th>
                    <th className="text-adminBlue font-semibold text-lg w-[40%]">Instruction</th>
                    <th className="text-adminBlue font-semibold text-lg w-[10%] rounded-3xl ">Days</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="mt-8">
              <tr><td><td><td><td><td></td></td></td></td></td></tr>
                <tr>
                    <td>
                        <input className="flex-grow h-8 py-2 w-full bg-transparent border-transparent focus:outline-none" type="text" value={medicine.name}  placeholder="Medicine Name" onChange={(e)=>setMedicine({type:'SET_NAME',payload:e.target.value})}/>
                    </td>
                    <td>
                        <input className="flex-grow h-8 py-2  w-full bg-transparent border-transparent focus:outline-none" type="text" value={medicine.type}  placeholder="Medicine Type" onChange={(e)=>setMedicine({type:'SET_TYPE',payload:e.target.value})}/>
                    </td>
                    <td>
                        <input className="flex-grow h-8 py-2  w-full bg-transparent border-transparent focus:outline-none" type="text" value={medicine.instruction}  placeholder="Instruction" onChange={(e)=>setMedicine({type:'SET_INSTRUCTION',payload:e.target.value})}/>
                    </td>
                    <td>
                        <input className="flex-grow h-8 py-2  bg-transparent border-transparent focus:outline-none" type="number" value={medicine.days}  placeholder="Days" onChange={(e)=>setMedicine({type:'SET_DAYS',payload:parseInt(e.target.value)})}/>
                    </td>
                    <td>
                      <button className="neumorphic-navBtn  py-1 px-1 w-7 h-7 rounded-lg" onClick={addMedicine}>
                        <img className="w-full" src={add} alt="Button Icon"  />
                      </button>
                    </td>
                </tr>
                {
                  listMedicines.map((obj)=>{
                    return(
                      <tr >
                        <td>{obj.name}</td>
                        <td>{obj.type}</td>
                        <td>{obj.instruction}</td>
                        <td>{obj.days}</td>
                        <td>
                          <button className="neumorphic-navBtn  py-1 px-1 w-7 h-7 rounded-lg" >
                            <img className="w-full" src={bin} alt="Button Icon"  />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
        </table>

        <table className="w-full  mt-4 ">
            <thead className="neumorphic-navBtn text-left w-full h-10 mt-3 bg-slate-900">
                <tr >
                    <th className="text-adminBlue font-semibold text-lg w-[25%] rounded-l-3xl pl-4">Diagnosis Name</th>
                    <th className="text-adminBlue font-semibold text-lg w-[75%]">Instruction</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="mt-8">
              <tr><td><td><td><td><td></td></td></td></td></td></tr>
                <tr>
                    <td>
                        <input className="flex-grow h-8 py-2 w-full bg-transparent border-transparent focus:outline-none" type="text" value={diagnosis.name}  placeholder="Diagnosis Name" onChange={(e)=>setDiagnosis({type:'SET_NAME',payload:e.target.value})}/>
                    </td>
                    
                    <td>
                        <input className="flex-grow h-8 py-2  w-full bg-transparent border-transparent focus:outline-none" type="text" value={diagnosis.instruction}  placeholder="Instruction" onChange={(e)=>setDiagnosis({type:'SET_INSTRUCTION',payload:e.target.value})}/>
                    </td>
                    <td>
                      <button className="neumorphic-navBtn  py-1 px-1 w-7 h-7 rounded-lg" onClick={addDiagnosis}>
                        <img className="w-full" src={add} alt="Button Icon"  />
                      </button>
                    </td>
                </tr>
                {
                  listDiagnosis.map((obj)=>{
                    return(
                      <tr >
                        <td>{obj.name}</td>
                        <td>{obj.instruction}</td>
                        <td>
                          <button className="neumorphic-navBtn  py-1 px-1 w-7 h-7 rounded-lg" >
                            <img className="w-full" src={bin} alt="Button Icon"  />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
        </table>
    </div>
    <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
    </div>
  </div>
  )
}

export default AddPrescription
