import { LabelProps } from "../../types/commonTypes"

function Label({labelName,value}:LabelProps) {

  
  return (
    <div className="mb-6 flex w-1/2 pr-4">
      <label className="font-bold text-xl mr-4  text-adminBlue">{labelName}:</label>
      <label className="font-bold text-lg w-32  text-adminGreen">{value}</label>
    </div>
  )
}

export default Label
