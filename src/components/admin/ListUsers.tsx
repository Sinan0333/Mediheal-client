import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { changeUserBlock, listUsers, totalUsers } from "../../api/admin/UserManagementApi"
import { UserData } from "../../types/userTypes"
import { notifyError, notifySuccess } from "../../constants/toast"
import { blockGreen, blockRed } from "../../constants/icons"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import Pagination from "../common/Pagination"
import Filter from "../common/Filter"
import ConfirmationModal from "./ConfirmationModal"

function ListUsers() {

    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [list,setList] = useState<UserData[] >([])
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
        listUsers(query).then((res)=>{
            setList(res.data)
        })
        totalUsers(query).then((res)=>{
            setPages(createInitialPages(res.data/limit))
        })
        .catch((err)=>{
            console.log(err.message);
        })
    },[query])

    const handleBlocking = async()=>{

        const response = await changeUserBlock(selectedData._id,selectedData.is_blocked) 
        if(!response.status) notifyError(response.message) 
        
        const response2 = await listUsers(query)
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
        navigate("/admin/users"+`?search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${i}`)
    }

  return (
    <div className="neumorphic py-2 px-2 w-screen min-h-screen pl-4 pt-4 lg:ml-64">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Users</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Search</button>
        {
            isConfirmationOpen ? <ConfirmationModal isConfirmationModalOpen={isConfirmationOpen} setIsConfirmationModalOpen={setIsConfirmationOpen} onConfirm={handleBlocking} message={"Are you sure you want to block this user?"}/> : null
        }
        {
            isFilterOpen?<Filter baseUrl="/admin/users" searchInput={true}  chargeInput={false}   isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>:null
        }
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Email</th>
                        <th className="px-4 py-2 text-left w-auto">Phone</th>
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
                                    <td className="px-4 py-2">{obj.email}</td>
                                    <td className="px-4 py-2">{obj.phone}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex">
                                            <button className="neumorphic-navBtn  py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/admin/users/view/${obj._id}`)}>
                                                <img src="/assets/icons/eye.png" alt="Button Icon"  />
                                            </button>
                                           <button className={`${obj.is_blocked ? "neumorphic-clicked bg-red-950" : "neumorphic-navBtn"}  py-2 px-2 ml-1 w-8 h-8 rounded-lg`} onClick={() =>{setSelectedData({is_blocked:!obj.is_blocked,_id:obj._id}),setIsConfirmationOpen(true)}}>
                                                <img  src={obj.is_blocked ? blockRed : blockGreen} alt="" />
                                            </button>
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

export default ListUsers
