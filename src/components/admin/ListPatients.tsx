import { useEffect, useState } from "react"
import { PatientData } from "../../types/userTypes"
import { useLocation, useNavigate } from "react-router-dom"
import { document, eye } from "../../constants/icons"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { getPatients, totalPatients } from "../../api/admin/patientManagementApi"
import { notifyError } from "../../constants/toast"
import { getDoctorPatients, totalDoctorPatients } from "../../api/doctor/doctorAppointmentApi"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import Pagination from "../common/Pagination"
import Filter from "../common/Filter"
import { BloodGroups, PatientsSortByData } from "../../constants/constValues"

function ListPatients() {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [list,setList] = useState<PatientData[] >([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [isFilterOpen,setIsFilterOpen] = useState<boolean>(false)

    const doctorId:string = useSelector((state:RootState)=>state.doctor._id)
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
        if(location.pathname.split("/").includes("admin")){
            getPatients(query).then((res)=>{
                setList(res.data)
            })
            totalPatients(query).then((res)=>{
                setPages(createInitialPages(res.data/limit))
            })
            .catch((err)=>{
                console.log(err.message);
            })
        }else{
            getDoctorPatients(doctorId,query).then((res)=>{
                setList(res.data)
            })
            totalDoctorPatients(doctorId,query).then((res)=>{
                setPages(createInitialPages(res.data/limit))
            })
            .catch((err)=>{
                console.log(err.message);
                
            })
        }
    },[query])

    const handleNavigation = (_id:string | undefined)=>{
        if(!_id) notifyError("Something wrong")
        if(location.pathname.split("/").includes("admin")){
            navigate(`/admin/patients/view/${_id}`)
        }else{
            navigate(`/doctor/patients/view/${_id}`)
        }
    }

    const handleShowPrescriptions = (_id :string | undefined)=>{
        if(!_id) notifyError("Something wrong")
        if(location.pathname.split("/").includes("admin")){
            navigate(`/admin/prescription/patient/${_id}`)
        }else{
            navigate(`/doctor/prescription/patient/${_id}`)
        }
    }

    const handleClick = async (i:number)=>{

        if(i<4){
            setPages(createInitialPages(pages.length/limit))
        }else{
            handlePagination(i,currentPage,pages,pageCount)
        }
        setCurrentPage(i)
        const baseUrl = location.pathname.split("/").includes("admin") ? "/admin/patient?" : "/doctor/patients?"
        navigate(baseUrl+`search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${i}`)
    }

  return (
    <div className="neumorphic py-2 px-2 w-screen min-h-screen pl-4 pt-4 lg:ml-64">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Patients</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Filter</button>
        {
            isFilterOpen?<Filter baseUrl={location.pathname.split("/").includes("admin") ? "/admin/patient" : "/doctor/patients"} searchInput={true}  chargeInput={false} filterData={BloodGroups} filterInputName="Blood Groups" sortData={PatientsSortByData} sortInputName="Sort By" isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>:null
        }
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">ID</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Age</th>
                        <th className="px-4 py-2 text-left w-auto">Gender</th>
                        <th className="px-4 py-2 text-left w-auto">Date Of Birth</th>
                        <th className="px-4 py-2 text-left w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((obj,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(currentPage-1)*limit+(i+1)}</td>
                                    <td className="px-4 py-2">{obj.id}</td>
                                    <td className="px-4 py-2">{obj.firstName} {obj.secondName}</td>
                                    <td className="px-4 py-2">{obj.age}</td>
                                    <td className="px-4 py-2">{obj.gender}</td>
                                    <td className="px-4 py-2">{new Date(obj.dob).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">
                                    <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>handleNavigation(obj._id)}>
                                        <img className="w-full" src={eye} alt="Button Icon"  />
                                    </button>
                                    <button className="neumorphic-navBtn  py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>handleShowPrescriptions(obj._id)}>
                                        <img className="w-full" src={document} alt="Button Icon"  />
                                    </button>
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

export default ListPatients
