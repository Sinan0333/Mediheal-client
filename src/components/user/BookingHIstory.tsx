import { useEffect, useState } from "react"
import { AppointmentPopulateData, ResponseData } from "../../types/commonTypes"
import { bookingHistory, cancelBooking } from "../../api/user/appointment"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { notifyError } from "../../constants/toast"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { useNavigate } from "react-router-dom"
import { Socket } from "socket.io-client"
import { useSocket } from "../../store/context/socketContext"
import InputModal from "../common/InputModal"
import Pagination from "../common/Pagination"

function BookingHistory() {
    const [list,setList] =useState<AppointmentPopulateData[]>([])
    const [reload,setReload] = useState<boolean>(false)
    const userId = useSelector((state:RootState)=>state.user._id)
    const [pageData,setPageData] = useState<AppointmentPopulateData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [isCancelReasonModalOpen,setIsCancelReasonModalOpen] = useState<boolean>(false)
    const [cancelReason,setCancelReason] = useState<string>("")
    const [_id,set_id] = useState<string | undefined>("")
    const [fees,setFees] = useState<number>(0)
    const navigate = useNavigate()
    const limit = 13
    const pageCount = Math.ceil(list.length/limit)   
    const socket:Socket = useSocket()


    useEffect(()=>{
        bookingHistory(userId).then((res)=>{
            setList(res.data)
            setPageData(res.data.slice(0,limit))
            setPages(createInitialPages(res.data.length/limit))
        }).catch((err:any)=>{
            console.log(err.message)
        })
    },[reload])

    useEffect(()=>{
        socket.on("chat:started",()=>{
            console.log("booking history");
            
            setReload(!reload)
        })
    },[socket])

    const handleCancel = async(_id:string | undefined,amount:number)=>{
        try {

            if(!_id) return notifyError("Something wrong")    
            if(!cancelReason) return notifyError("Please provide reason for cancellation")      

            let response:ResponseData = await cancelBooking(_id,{date:new Date(),description:"Cancelled Booking",cancelReason,amount})
            if(!response.status) return notifyError(response.message)

            setReload(!reload)
            setIsCancelReasonModalOpen(false)
        } catch (error) {
            
        }
    }

    const handleClick = async (i:number)=>{

        if(i<4){
            setPageData(list.slice((i-1)*limit,i*limit))
            setPages(createInitialPages(list.length/limit))
        }else{
            handlePagination(i,currentPage,pages,pageCount)
            setPageData(list.slice((i-1)*limit,i*limit))
        }
        setCurrentPage(i)
    }

  return (
    <div className="  mt-10 ">
        <InputModal state={cancelReason} setState={setCancelReason} handleSubmit={handleCancel} _id={_id} fees={fees} setIsModalOpen={setIsCancelReasonModalOpen} isModalOpen={isCancelReasonModalOpen} title="Reason for Cancellation"/> 
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Booked Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Time
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
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                pageData.map((obj)=>{
                    return(
                        <tr key={obj._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {new Date(obj.bookedDate).toLocaleDateString()}
                            </th>
                            <td className="px-6 py-4">
                                {obj.startTime} - {obj.endTime}
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
                            <td className={`px-6 py-4 ${obj.status === 'Pending' ? 'text-yellow-700' : obj.status === 'Checked' ? 'text-green-700' : 'text-red-700'}`}>
                                {obj.status}
                            </td>
                            <td className="px-6 py-4">
                                {obj.status === "Cancelled" || obj.status === "Checked" ? (
                                    ""
                                ) : (
                                    obj.status === "Pending" && obj.chat ? (
                                        <button
                                            type="button"
                                            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                                            onClick={() => navigate(`/chat/${obj.doctor._id}/${obj.patient._id}`)}
                                        >
                                            Join Now
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                            onClick={() =>{ setIsCancelReasonModalOpen(!isCancelReasonModalOpen),set_id(obj._id),setFees(obj.doctor.fees)}}
                                        >
                                            Cancel
                                        </button>
                                    )
                                )}
                            </td>
                        </tr> 
                    )
                })
            }
        </tbody>
    </table>
    <div className="flex justify-center items-center mt-8">
        {
            pageCount > 1 ? <Pagination pages={pages} currentPage={currentPage} handleClick={handleClick} pageCount={pageCount}/> : null
        }
    </div>
</div>
  )
}

export default BookingHistory
