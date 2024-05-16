import { useEffect, useState } from "react"
import { notifyError, notifySuccess } from "../../constants/toast"
import { changeAChatStatus, getDoctorAppointments, totalDoctorAppointments } from "../../api/doctor/doctorAppointmentApi"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { AppointmentPopulateData, ResponseData } from "../../types/commonTypes"
import {three_dots} from "../../constants/icons"
import { cancelBooking } from "../../api/user/appointment"
import { useLocation, useNavigate } from "react-router-dom"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { useSocket } from "../../store/context/socketContext"
import { Socket } from "socket.io-client"
import Filter from "../common/Filter"
import { AppointmentFilterDays, AppointmentSortData } from "../../constants/constValues"
import Pagination from "../common/Pagination"
import ConfirmationModal from "../admin/ConfirmationModal"

function ListAppointments() {

    const navigate = useNavigate()
    const socket:Socket = useSocket()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const doctorId = useSelector((state:RootState)=>state.doctor._id)

    const [list,setList] = useState<AppointmentPopulateData[] >([])
    const [reload,setReload] = useState<Boolean>(false)
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [isFilterOpen,setIsFilterOpen] = useState<boolean>(false)
    const [selectedAppointment,setSelectedAppointment] = useState<AppointmentPopulateData | null>(null)
    const [isConfirmationModalOpen,setIsConfirmationModalOpen] = useState<boolean>(false)

    const limit = 13
    const pageCount = pages.length  

    const search = searchParams.get('search') || "default"
    const charge = searchParams.get('charge') || "default"
    const filterData = searchParams.get('filterData') || "default"
    const sortBy = searchParams.get('sortBy') || "default"
    const sortIn = searchParams.get('sortIn') || "default"
    const page:string | null | number = searchParams.get('page') || 1
    const query = `search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${page}`
    

    useEffect(()=>{
        getDoctorAppointments(doctorId,query).then((res)=>{
            setList(res.data)
        })
        totalDoctorAppointments(doctorId,query).then((res)=>{
            setPages(createInitialPages(res.data/limit))
        })
        .catch((err)=>{
            console.log(err.message);
        })
    },[reload,query])

    const handleClick = async (i:number)=>{

        if(i<4){
            setPages(createInitialPages(pages.length/limit))
        }else{
            handlePagination(i,currentPage,pages,pageCount)
        }
        setCurrentPage(i)
        navigate(`/doctor/appointments?`+`search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${i}`)
    }

    const handleCancel = async()=>{
        try {

            if(!selectedAppointment?._id || !selectedAppointment?.doctor.fees) return notifyError("Something wrong")

            let response:ResponseData = await cancelBooking(selectedAppointment?._id,{date:new Date(),description:"Doctor Cancelled Booking",amount:selectedAppointment?.doctor.fees})
            if(!response.status) return notifyError(response.message)
            
            notifySuccess("Appointment Cancelled Successfully")
            setReload(!reload)
        } catch (error) {
            
        }
    }

    const handleChatClick = async (_id:string | undefined)=>{

        if(!_id) return notifyError("Something wrong")
        const response:ResponseData = await changeAChatStatus(_id,true)

        if(!response.status) return notifyError(response.message)
            
        socket.emit("chat:started",{to:response.data.userId})
        navigate(`/doctor/chat/${response.data.patient._id}/${response.data._id}`)
    }


  return (
    <div className="neumorphic py-2 px-2 w-screen min-h-screen pl-4 pt-4 lg:ml-64">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Appointments</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Filter</button>
        {
            isConfirmationModalOpen ? <ConfirmationModal isConfirmationModalOpen={isConfirmationModalOpen} setIsConfirmationModalOpen={setIsConfirmationModalOpen} onConfirm={handleCancel} message={"Are you sure you want to cancel this appointment?"}/> : null
        }
        {
            isFilterOpen?<Filter baseUrl="/doctor/appointments" searchInput={false}  chargeInput={false} filterData={AppointmentFilterDays} filterInputName="Days" sortData={AppointmentSortData} sortInputName="Sort By" isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>:null
        }
        <div className="overflow-x-auto w-full">
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
                        list.map((obj,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(currentPage-1)*limit+(i+1)}</td>
                                    <td className="px-4 py-2">{obj.patient.id}</td>
                                    <td className="px-4 py-2">{obj.patient.firstName} {obj.patient.secondName}</td>
                                    <td className="px-4 py-2">{obj.day}</td>
                                    <td className="px-4 py-2">{obj.startTime} - {obj.endTime}</td>
                                    <td className="px-4 py-2">{obj.type}</td>
                                    <td className="px-4 py-2">{obj.status}</td>
                                    <td className="px-4 py-2 ">
                                    <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>{if(selectedAppointment) setSelectedAppointment(null) ;else setSelectedAppointment(obj)}} >
                                        <img className="w-full" src={three_dots} alt="Button Icon"  />
                                    </button>
                                    <div id="dropdownDelay" className={`z-10 ${ selectedAppointment && selectedAppointment._id === obj._id ? "block" : "hidden"}  mt-3 absolute right-0 bg-[#e0e0e0] divide-y divide-gray-100 rounded-lg shadow-xl mr-3 dark:bg-gray-700`}>
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                                        <li>
                                            <p className="block px-4 py-2 cursor-pointer dark:hover:text-white" onClick={()=>navigate(`/doctor/prescription/patient/${selectedAppointment?.patient._id}`)}>Prescriptions</p>
                                        </li>
                                        <li>
                                            <p className="block px-4 py-2 cursor-pointer dark:hover:text-white" onClick={()=>navigate(`/doctor/patients/view/${selectedAppointment?.patient._id}`)}>Show Patient Details</p>
                                        </li>
                                        {
                                            obj.status === "Pending" && obj.type === "Online" 
                                            ?<li>
                                                <p className="block px-4 py-2 cursor-pointer dark:hover:text-white" onClick={()=>handleChatClick(selectedAppointment?._id)}>Start Chat</p>
                                            </li>
                                            :""
                                        }
                                        {
                                            obj.status === "Pending" 
                                            ?<li>
                                                <p className="block px-4 py-2 cursor-pointer dark:hover:text-white" onClick={()=>setIsConfirmationModalOpen(true)}>Cancel</p>
                                            </li>
                                            :""
                                        }
                                        </ul>
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
            {
                pageCount > 1 ? <Pagination pages={pages} currentPage={currentPage} handleClick={handleClick} pageCount={pageCount}/> : null
            }
        </div>
    </div>
  )
}

export default ListAppointments
