import { useState } from "react"
import { ScheduleType, SlotsTableProps } from "../../types/doctorTypes"

function SlotsTable({slots}:SlotsTableProps) {
    const [daySlots,setDaySlots] = useState<ScheduleType[]>()
    const slotsArray = Object.entries(slots)

    slotsArray.shift()
    slotsArray.pop()
    
  return (
    <div className="mt-10 border-2 border-gray-500 p-1">
      <div className="bg-adminBlue p-8 items-center">
        <h1 className="text-2xl text-white font-semibold">Choose Date And Time</h1>
        <h3 className="text-white">Please Select Your Date And Time For Appointment</h3>
      </div>
      <div className="p-4">
        <div>
            <h1 className="text-lg  font-semibold mb-4">Choose Day</h1>
            <div className="grid grid-cols-7 grid-rows-1 gap-8">
                {
                    slotsArray?.map((day)=>{
                        return(
                            <div className="border-2 border-gray-500 hover:border-blue-600 hover: flex justify-center items-center p-2 cursor-pointer font-medium " onClick={()=>(setDaySlots(day[1]))}>{day[0]}</div>
                        )
                    })
                }
            </div>
        </div>
        <div className="mt-8">
            <h1 className="text-lg font-semibold mb-4">Choose Time</h1>
            <div className="grid grid-cols-7 grid-rows-1 gap-8">
                {
                    daySlots?.map((slot)=>{
                        return(
                            <div className="border-2 border-gray-500 hover:border-blue-600 hover: flex justify-center items-center p-2 cursor-pointer font-medium ">{slot.startTime} - {slot.endTime}</div>
                        )
                    })
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default SlotsTable
