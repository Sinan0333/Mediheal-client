import { useState } from "react"
import Inputs from "./Inputs"
import { notifyError, notifySuccess } from "../../constants/toast"
import { ResponseData } from "../../types/commonTypes"
import { useNavigate } from "react-router-dom"
import { addBedValidation } from "../../validations/admin/bedValidation"
import { addBedApi } from "../../api/admin/bedApi"

function AddBedForm() {
    const [type ,setType] = useState<string>("")
    const [charge,setCharge] = useState<number>(0)
    const navigate = useNavigate()
  
    async function handleSubmit() {
  
      const validation: string = addBedValidation({ type,charge });
      if (validation !== "Success") return notifyError(validation);
  
      try {
        
          const response:ResponseData =await addBedApi({type,charge})
          if(!response.status) return notifyError(response.message)
          notifySuccess(response.message)
          navigate('/admin/bed')
  
      } catch (error) {
        console.error(error);
        notifyError("Error occurred while converting images.");
      }
    }
    
  
    return (
      <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Add Bed</h1>
        <div className="mb-6 ">
        <div className="mb-6 flex w-1/2 pr-4">
          <label className="font-semibold text-lg w-44 mr-4 text-adminBlue">Gender</label>
          <select className="block w-full py-2 px-4 bg-transparent border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e)=>setType(e.target.value)}>
          <option value="">Select Bed Type</option>\
            <option value='ICU'>ICU</option>
            <option value='ward'>Ward</option>
            <option value='Ac'>Ac</option>
            <option value='Non Ac'>Non Ac</option>
            <option value='Covid 19'>Covid 19</option>
            <option value='Cabin'>Cabin</option>
          </select>
        </div>
         <Inputs name="Charge" type="number" setState={setCharge} state={charge}/>
        </div>
        <div className="flex justify-center">
          <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )
}

export default AddBedForm
