import { useState } from "react"
import { OneSlotType, SlotsTableProps } from "../../types/doctorTypes"
import { days } from "../../types/commonTypes"

function ScheduleTable({slots,state,setState,selectedDay,setSelectedDay}:SlotsTableProps) {
    const [daySlots,setDaySlots] = useState<OneSlotType[]>()
    const slotsArray = Object.entries(slots)
    
    slotsArray.shift()
    slotsArray.pop()

    const timeFormateOption : Intl.DateTimeFormatOptions  =  { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit' }
    const currentDate = new Date();
    const currentDay = currentDate.getDay()
    const ISTTime = currentDate.toLocaleTimeString('en-US', timeFormateOption);
    const splitISTTime = ISTTime.split(':')
    
  return (
    <div className="border-2 border-gray-500 p-1">
      <div className="bg-adminBlue p-8 items-center">
        <h1 className="text-2xl text-white font-semibold">Take A Break</h1>
        <h3 className="text-white">Select A Day And Time To Take A Break OR Choose A Day To Take A FullDay Leave</h3>
      </div>
      <div className="p-4">
        <div>
            <h1 className="text-lg  font-semibold mb-4">Choose Day</h1>
            <div className="grid grid-cols-7 grid-rows-1 gap-8">
                {
                    slotsArray?.map((day,i)=>{
                        return(
                            i+1 >= currentDay ? <div key={day[0]}  className={`${ selectedDay=== day[0] ? "bg-adminBlue text-white" : "text-black" } border-2 border-gray-500 hover:border-blue-600 hover: flex justify-center items-center p-2 cursor-pointer font-medium`} onClick={()=>{ if(Array.isArray(day[1])){setDaySlots(day[1])} setSelectedDay(day[0])}}>{day[0]}</div> : ""
                        )
                    })
                }
            </div>
        </div>
        <div className="mt-8">
            <h1 className="text-lg font-semibold mb-4">Choose Time</h1>
            <div className="grid grid-cols-7 grid-rows-1 gap-8">
            {
                daySlots?.map((slot) => {
                    const startTime = slot.startTime.split(":");
                    const currentHour = parseInt(splitISTTime[0]);
                    const currentMinute = parseInt(splitISTTime[1]);
                    const slotStartHour = parseInt(startTime[0]);
                    const slotStartMinute = parseInt(startTime[1]);

                    if(days[currentDay] === selectedDay){
                        if (currentHour < slotStartHour || (currentHour === slotStartHour && currentMinute < slotStartMinute)) {
                            return slot.break ? (
                                <div key={slot._id} className=" border-2 border-yellow-400 text-yellow-400 flex justify-center items-center p-2 cursor-pointer font-medium">
                                    {slot.startTime} - {slot.endTime}
                                </div>
                                ) : slot.isReserved ? (
                                <div key={slot._id} style={state._id === slot._id ? { backgroundColor: '#164B55', color: 'white', borderColor: 'white' } : {}} className="border-2 border-green-500 text-green-500  flex justify-center items-center p-2 cursor-pointer font-medium" onClick={() => setState(slot)}>
                                    {slot.startTime} - {slot.endTime}
                                </div>
                                ) : (
                                <div key={slot._id} style={state._id === slot._id ? { backgroundColor: '#164B55', color: 'white', borderColor: 'white' } : {}} className="border-2 border-gray-500 hover:border-blue-600 hover: flex justify-center items-center p-2 cursor-pointer font-medium" onClick={() => setState(slot)}>
                                    {slot.startTime} - {slot.endTime}
                                </div>
                            );
                        } else {
                            return null;
                        }
                    }else{
                        return slot.break ? (
                            <div key={slot._id} className=" border-2 border-yellow-400 text-yellow-400 flex justify-center items-center p-2 cursor-pointer font-medium">
                                {slot.startTime} - {slot.endTime}
                            </div>
                            ) : slot.isReserved ? (
                            <div key={slot._id} style={state._id === slot._id ? { backgroundColor: '#164B55', color: 'white', borderColor: 'white' } : {}} className="border-2 border-green-500 text-green-500  flex justify-center items-center p-2 cursor-pointer font-medium" onClick={() => setState(slot)}>
                                {slot.startTime} - {slot.endTime}
                            </div>
                            ) : (
                            <div key={slot._id} style={state._id === slot._id ? { backgroundColor: '#164B55', color: 'white', borderColor: 'white' } : {}} className="border-2 border-gray-500 hover:border-blue-600 hover: flex justify-center items-center p-2 cursor-pointer font-medium" onClick={() => setState(slot)}>
                                {slot.startTime} - {slot.endTime}
                            </div>
                        );
                    }
                })
            }
            </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleTable
