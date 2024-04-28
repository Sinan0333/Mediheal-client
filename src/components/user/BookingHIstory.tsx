import { useEffect, useState } from "react"
import { AppointmentPopulateData, ResponseData } from "../../types/commonTypes"
import { bookingHistory, cancelBooking } from "../../api/user/appointment"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { notifyError } from "../../constants/toast"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { useNavigate } from "react-router-dom"

function BookingHistory() {
    const [list,setList] =useState<AppointmentPopulateData[]>([])
    const [reload,setReload] = useState<boolean>(false)
    const userId = useSelector((state:RootState)=>state.user._id)
    const [pageData,setPageData] = useState<AppointmentPopulateData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const navigate = useNavigate()
    const limit = 13
    const pageCount = Math.ceil(list.length/limit)   


    useEffect(()=>{
        bookingHistory(userId).then((res)=>{
            setList(res.data)
            setPageData(res.data.slice(0,limit))
            setPages(createInitialPages(res.data.length/limit))
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
    <div className="relative  mt-10 ">
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
                            <td className="px-6 py-4">
                                {obj.status}
                            </td>
                            <td className="px-6 py-4">
                                {obj.status === "Cancelled" || obj.status === "Checked" ? (
                                    ""
                                ) : (
                                    obj.status === "Pending" && obj.chatId ? (
                                        <button
                                            type="button"
                                            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
                                            onClick={() => navigate(`/chat/${obj.chatId}`)}
                                        >
                                            Join Now
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                            onClick={() => handleCancel(obj._id, obj.doctor.fees)}
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
            <nav className="flex">
                {
                    currentPage === 1 ? "" : <p  className="neumorphic-pagination flex justify-center items-center cursor-pointer py-4 px-4 h-8 rounded-lg hover:bg-gray-300"onClick={()=>handleClick(currentPage-1)}>Previous</p>
                }
                {
                    pages.map((page)=>{
                        return(
                            <p key={page} className={`${currentPage === page ?"neumorphic-pagination-clicked":"neumorphic-pagination"} flex justify-center items-center cursor-pointer py-2 px-2 w-8 h-8 ml-2 rounded-lg hover:bg-gray-300`} onClick={()=>handleClick(page)}>{page}</p>

                        )
                    })
                }    
                    
                {
                    pageCount > 4 && pageCount-1 > currentPage? (
                        <>
                            <span className="px-3 py-1">...</span>
                            <p className="neumorphic-pagination flex justify-center items-center cursor-pointer py-2 px-2 w-8 h-8 ml-2 rounded-lg hover:bg-gray-300" onClick={()=>handleClick(pageCount)}>{pageCount}</p>
                        </>
                    ) : null
                }
                
                {
                    currentPage === pageCount ? "" : <p  className="neumorphic-pagination flex justify-center items-center cursor-pointer py-4 px-4 h-8 ml-2  rounded-lg hover:bg-gray-300" onClick={()=>handleClick(currentPage+1)}>Next</p>
                }
                
            </nav>
        </div>
</div>
  )
}

export default BookingHistory
