import { useEffect, useState } from "react"
import { notifyError, notifySuccess } from "../../constants/toast"
import { getDoctorAppointments } from "../../api/doctor/doctorAppointmentApi"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { AppointmentPopulateData, ResponseData } from "../../types/commonTypes"
import { cancel,eye, plus} from "../../constants/icons"
import { cancelBooking } from "../../api/user/appointment"
import { useNavigate } from "react-router-dom"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"

function ListAppointments() {

    const [list,setList] = useState<AppointmentPopulateData[] >([])
    const [reload,setReload] = useState<Boolean>(false)
    const doctorId = useSelector((state:RootState)=>state.doctor._id)
    const [pageData,setPageData] = useState<AppointmentPopulateData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const limit = 13
    const pageCount = Math.ceil(list.length/limit)   
    const navigate = useNavigate()


    useEffect(()=>{
        getDoctorAppointments(doctorId).then((res)=>{
            setList(res.data)
            setPageData(res.data.slice(0,limit))
            setPages(createInitialPages(res.data.length/limit))
        }).catch((err)=>{
            console.log(err.message);
        })
    },[reload])

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

    const handleCancel = async(_id:string | undefined,amount:number)=>{
        try {

            if(!_id) return notifyError("Something wrong")

            let response:ResponseData = await cancelBooking(_id,{date:new Date(),description:"Doctor Cancelled Booking",amount})
            if(!response.status) return notifyError(response.message)
            
            notifySuccess("Appointment Cancelled Successfully")
            setReload(!reload)
        } catch (error) {
            
        }
    }


  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Appointments</h1>
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">PatientID</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Day</th>
                        <th className="px-4 py-2 text-left w-auto">Time</th>
                        <th className="px-4 py-2 text-left w-auto">Type</th>
                        <th className="px-4 py-2 text-left w-auto">Status</th>
                        <th className="px-4 py-2 text-left w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pageData.map((obj,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(currentPage-1)*limit+(i+1)}</td>
                                    <td className="px-4 py-2">{obj.patient.id}</td>
                                    <td className="px-4 py-2">{obj.patient.firstName} {obj.patient.secondName}</td>
                                    <td className="px-4 py-2">{obj.day}</td>
                                    <td className="px-4 py-2">{obj.startTime} - {obj.endTime}</td>
                                    <td className="px-4 py-2">{obj.type}</td>
                                    <td className="px-4 py-2">{obj.status}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex">
                                            {
                                            obj.status ==="Pending" ?<button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>handleCancel(obj._id,obj.doctor.fees)}>
                                                <img className="w-full" src={cancel} alt="Button Icon"  />
                                            </button> : ""
                                            }
                                            <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/doctor/patients/view/${obj.patient._id}`)}>
                                                <img className="w-full" src={eye} alt="Button Icon"  />
                                            </button>
                                           {
                                            obj.status === "Pending" ?  <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/doctor/appointments/prescription/add/${obj.patient._id}/${obj._id}`)}>
                                            <img className="w-full" src={plus} alt="Button Icon"  />
                                            </button> : ""
                                           }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
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

export default ListAppointments
