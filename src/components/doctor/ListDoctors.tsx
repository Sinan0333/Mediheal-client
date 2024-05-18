import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import  Actions from '../admin/Actions'
import { DoctorData } from "../../types/doctorTypes"
import { notifyError, notifySuccess } from "../../constants/toast"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { ResponseData } from "../../types/commonTypes"
import { changeBlockStatus, listDoctorsApi, totalDoctors } from "../../api/admin/doctorManagementApi"
import { DepartmentDataType } from "../../types/adminTypes"
import { listDepartmentApi } from "../../api/admin/departmentManagementApi"
import { DoctorSortByData } from "../../constants/constValues"
import Filter from "../common/Filter"
import Pagination from "../common/Pagination"
import ConfirmationModal from "../admin/ConfirmationModal"

function ListDoctors() {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [list,setList] = useState<DoctorData[] >([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [departments,setDepartments] = useState<DepartmentDataType[]>([])
    const [isFilterOpen,setIsFilterOpen] = useState<boolean>(false)
    const [isConfirmationOpen,setIsConfirmationOpen] = useState<boolean>(false)
    const [selectedData,setSelectedData] = useState<{_id:string | undefined , is_blocked:boolean } >({_id:undefined,is_blocked:false})

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
        listDoctorsApi(query).then((res)=>{
            setList(res.data)
        })
        totalDoctors(query).then((res)=>{
            setPages(createInitialPages(res.data/limit))
        })
        .catch((err)=>{
            console.log(err.message);
        })
    },[query])

    useEffect(()=>{
        listDepartmentApi().then((res)=>{
            setDepartments(res.data)            
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

    const handleBlocking = async()=>{

        const response = await changeBlockStatus(selectedData._id,selectedData.is_blocked) 
        if(!response.status) notifyError(response.message) 
        
        const response2:ResponseData = await listDoctorsApi(query)
        setList(response2.data)
        notifySuccess(response.message)
    }

    const handleClick = async (i:number)=>{

        if(i<4){
            setPages(createInitialPages(pages.length/limit))
        }else{
            handlePagination(i,currentPage,pages,pageCount)
        }
        setCurrentPage(i)
        navigate("/admin/doctors"+`?search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${i}`)
    }

  return (
    <div className="neumorphic py-2 px-2  w-full min-h-screen pl-4 pt-4 lg:ml-64 ">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Doctors</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue ml-2 float-right" onClick={()=>navigate('/admin/doctors/add')}>Add</button>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Filter</button>
        {
            isConfirmationOpen ? <ConfirmationModal isConfirmationModalOpen={isConfirmationOpen} setIsConfirmationModalOpen={setIsConfirmationOpen} onConfirm={handleBlocking} message={"Are you sure you want to block this doctor?"}/> : null
        }
        {
            isFilterOpen?<Filter baseUrl="/admin/doctors" searchInput={true}  chargeInput={false} filterData={departments} filterInputName="Department" sortData={DoctorSortByData} sortInputName="Sort By" isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>:null
        }
        <div className="  overflow-x-auto w-full ">
            <table className="table-auto w-full border  border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Department</th>
                        <th className="px-4 py-2 text-left w-auto">Phone</th>
                        <th className="px-4 py-2 text-left w-auto">Email</th>
                        <th className="px-4 py-2 text-left w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((doc,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(currentPage-1)*limit+(i+1)}</td>
                                    <td className="px-4 py-2">{doc.firstName + doc.secondName}</td>
                                    <td className="px-4 py-2">{doc.department.name}</td>
                                    <td className="px-4 py-2">{doc.phone}</td>
                                    <td className="px-4 py-2">{doc.email}</td>
                                    <td className="px-4 py-2"><Actions viewNav={`/admin/doctors/view/${doc._id}`} editNav={`/admin/doctors/edit/${doc._id}`} _id={doc._id} is_blocked={doc.is_blocked} setSelectedData={setSelectedData} setIsConfirmationModalOpen={setIsConfirmationOpen}/></td>
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

export default ListDoctors
