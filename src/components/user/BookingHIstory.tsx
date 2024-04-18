import { useEffect, useState } from "react"
import { AppointmentPopulateData, ResponseData } from "../../types/commonTypes"
import { bookingHistory, cancelBooking } from "../../api/user/appointment"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { notifyError } from "../../constants/toast"

function BookingHistory() {
    const [list,setList] =useState<AppointmentPopulateData[]>()
    const [reload,setReload] = useState<boolean>(false)
    const userId = useSelector((state:RootState)=>state.user._id)


    useEffect(()=>{
        bookingHistory(userId).then((res)=>{
            setList(res.data)
        }).catch((err:any)=>{
            console.log(err.message)
        })
    },[reload])

    const handleCancel = async(_id:string | undefined,amount:number)=>{
        try {

            if(!_id) return notifyError("Something wrong")

            let response:ResponseData = await cancelBooking(_id,{date:new Date(),description:"Cancelled Booking",amount})
            if(!response.status) return notifyError(response.message)

            setReload(!reload)
        } catch (error) {
            
        }
    }

  return (
    <div className="relative overflow-x-auto mt-10 ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Booked Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                    End Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Fees
                </th>
                <th scope="col" className="px-6 py-3">
                    Patient
                </th>
                <th scope="col" className="px-6 py-3">
                    Doctor
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Cancel
                </th>
            </tr>
        </thead>
        <tbody>
            {
                list?.map((obj)=>{
                    return(
                        <tr key={obj._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {new Date(obj.bookedDate).toLocaleDateString()}
                            </th>
                            <td className="px-6 py-4">
                                {obj.startTime}
                            </td>
                            <td className="px-6 py-4">
                                {obj.endTime}
                            </td>
                            <td className="px-6 py-4">
                                {obj.doctor.fees}
                            </td>
                            <td className="px-6 py-4">
                                {obj.patient.firstName} {obj.patient.secondName}
                            </td>
                            <td className="px-6 py-4">
                                {obj.doctor.firstName} {obj.doctor.secondName}
                            </td>
                            <td className="px-6 py-4">
                                {obj.type}
                            </td>
                            <td className="px-6 py-4">
                                {obj.status}
                            </td>
                            <td className="px-6 py-4">
                               {obj.status != "Cancelled" ? <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>handleCancel(obj._id,obj.doctor.fees)}>Cancel</button> : ""} 
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
</div>
  )
}

export default BookingHistory
