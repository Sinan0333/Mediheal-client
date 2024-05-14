import { useEffect, useState } from "react"
import { notifyError, notifySuccess } from "../../constants/toast"
import { changeAChatStatus, getDoctorAppointments, totalDoctorAppointments } from "../../api/doctor/doctorAppointmentApi"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { AppointmentPopulateData, ResponseData } from "../../types/commonTypes"
import { cancel,chat,eye, plus,document} from "../../constants/icons"
import { cancelBooking } from "../../api/user/appointment"
import { useLocation, useNavigate } from "react-router-dom"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { useSocket } from "../../store/context/socketContext"
import { Socket } from "socket.io-client"
import Filter from "../common/Filter"
import { AppointmentFilterDays, AppointmentSortData } from "../../constants/constValues"
import Pagination from "../common/Pagination"

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
            isFilterOpen?<Filter baseUrl="/doctor/appointments" searchInput={false}  chargeInput={false} filterData={AppointmentFilterDays} filterInputName="Days" sortData={AppointmentSortData} sortInputName="Sort By" isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>:null
        }
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
                                    <td className="px-4 py-2">
                                        <div className="flex ">
                                            <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/doctor/prescription/patient/${obj.patient._id}`)}>
                                                <img className="w-full" src={document} alt="Button Icon"  />
                                            </button>
                                            <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/doctor/patients/view/${obj.patient._id}`)}>
                                                <img className="w-full" src={eye} alt="Button Icon"  />
                                            </button>
                                           {
                                               obj.status === "Pending" && obj.type === "Online" ? <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>handleChatClick(obj._id)}>
                                            <img className="w-full" src={chat} alt="Button Icon"  />
                                            </button> : ""
                                           }
                                           {
                                               obj.status === "Pending" ?  <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/doctor/appointments/prescription/add/${obj.patient._id}/${obj._id}`)}>
                                            <img className="w-full" src={plus} alt="Button Icon"  />
                                            </button> : ""
                                           }
                                           {
                                           obj.status ==="Pending" ?<button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>handleCancel(obj._id,obj.doctor.fees)}>
                                               <img className="w-full" src={cancel} alt="Button Icon"  />
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
            {
                pageCount > 1 ? <Pagination pages={pages} currentPage={currentPage} handleClick={handleClick} pageCount={pageCount}/> : null
            }
        </div>
    </div>
  )
}

export default ListAppointments
