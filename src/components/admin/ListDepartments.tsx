import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { changeDepartmentBlock, listDepartmentApi, totalDepartments } from "../../api/admin/departmentManagementApi"
import { DepartmentDataType } from "../../types/adminTypes"
import Actions from "./Actions"
import { notifyError, notifySuccess } from "../../constants/toast"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { ResponseData } from "../../types/commonTypes"
import Filter from "../common/Filter"
import Pagination from "../common/Pagination"
import ConfirmationModal from "./ConfirmationModal"

function ListDepartments() {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [list,setList] = useState<DepartmentDataType[] >([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
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
        listDepartmentApi(query).then((res)=>{
            setList(res.data)
        })
        totalDepartments(query).then((res)=>{
            setPages(createInitialPages(res.data/limit))
        })
        .catch((err)=>{
            console.log(err.message);
        })
    },[query])

    const handleBlocking = async()=>{

        const response = await changeDepartmentBlock(selectedData._id,selectedData.is_blocked) 
        if(!response.status) notifyError(response.message) 

        const response2:ResponseData = await listDepartmentApi()
        setList(response2.data)
        notifySuccess(response.message)
    }
    
    const handleClick = async (i:number)=>{

        if(i<4){
            setPages(createInitialPages(list.length/limit))
        }else{
            handlePagination(i,currentPage,pages,pageCount)
        }
        setCurrentPage(i)
        navigate("/admin/departments"+`?search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${i}`)
    }


  return (
    <div className="neumorphic py-2 px-2  w-screen min-h-screen pl-4 pt-4 lg:ml-64">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Department</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue ml-2 float-right" onClick={()=>navigate('/admin/departments/add')}>Add</button>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Search</button>
        {
            isConfirmationOpen ? <ConfirmationModal isConfirmationModalOpen={isConfirmationOpen} setIsConfirmationModalOpen={setIsConfirmationOpen} onConfirm={handleBlocking} message={"Are you sure you want to block this Department?"}/> : null
        }
        {
            isFilterOpen?<Filter baseUrl="/admin/departments" searchInput={true}  isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>:null
        }
        <div className="overflow-x-auto ">
            <table className="table-auto min-w-full border-collapse">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Title</th>
                        <th className="px-4 py-2 text-left w-auto">Description</th>
                        <th className="px-4 py-2 text-left w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((obj,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(currentPage-1)*limit+(i+1)}</td>
                                    <td className="px-4 py-2">{obj.name}</td>
                                    <td className="px-4 py-2 max-w-60 overflow-hidden whitespace-nowrap text-overflow-ellipsis">{obj.title}</td>
                                    <td className="px-4 py-2 max-w-60 overflow-hidden whitespace-nowrap text-overflow-ellipsis">{obj.description}</td>
                                    <td className="px-4 py-2"><Actions viewNav={`/admin/departments/view/${obj._id}`} editNav={`/admin/departments/edit/${obj._id}`}  _id={obj._id} setIsConfirmationModalOpen={setIsConfirmationOpen} setSelectedData={setSelectedData} is_blocked={obj.is_blocked}/></td>
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

export default ListDepartments
