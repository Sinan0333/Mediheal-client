import { useEffect, useState } from "react"
import { PatientData } from "../../types/userTypes"
import { useLocation, useNavigate } from "react-router-dom"
import { document, eye } from "../../constants/icons"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { getPatients } from "../../api/admin/patientManagementApi"
import { getDoctorPatients } from "../../api/doctor/doctorPatient"
import { notifyError } from "../../constants/toast"

function ListPatients() {
    const [list,setList] = useState<PatientData[] >([])
    const [pageData,setPageData] = useState<PatientData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const limit = 13
    const pageCount = Math.ceil(list.length/limit)   
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(location.pathname.split("/").includes("admin")){
            getPatients().then((res)=>{
                setList(res.data)
                setPageData(res.data.slice(0,limit))
                setPages(createInitialPages(res.data.length/limit))
            }).catch((err)=>{
                console.log(err.message);
            })
        }else{
            getDoctorPatients().then((res)=>{
                setList(res.data)
                setPageData(res.data.slice(0,limit))
                setPages(createInitialPages(res.data.length/limit))
            }).catch((err)=>{
                console.log(err.message);
                
            })
        }
    },[])

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
            setPageData(list.slice((i-1)*limit,i*limit))
            setPages(createInitialPages(list.length/limit))
        }else{
            handlePagination(i,currentPage,pages,pageCount)
            setPageData(list.slice((i-1)*limit,i*limit))
        }
        setCurrentPage(i)
    }

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Patients</h1>
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
                        pageData.map((obj,i)=>{
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

export default ListPatients
