import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { changeUserBlock, listUsers } from "../../api/user/UserManagment"
import { UserData } from "../../types/userTypes"
import { notifyError, notifySuccess } from "../../constants/toast"
import { blockGreen, blockRed } from "../../constants/icons"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"

function ListUsers() {

    const navigate = useNavigate()
    const [list,setList] = useState<UserData[] >([])
    const [pageData,setPageData] = useState<UserData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const limit = 13
    const pageCount = Math.ceil(list.length/limit)   

    useEffect(()=>{
        listUsers().then((res)=>{
            setList(res.data)
            setPageData(res.data.slice(0,limit))
            setPages(createInitialPages(res.data.length/limit))
        }).catch((err)=>{
            console.log(err.message);
        })
    },)

    const handleBlocking = async(is_blocked:boolean,_id:string)=>{

        const response = await changeUserBlock(_id,is_blocked) 
        if(!response.status) notifyError(response.message) 
        
        const response2 = await listUsers()
        setList(response2.data)
        setPageData(response2.data.slice((currentPage-1)*limit,currentPage*limit))

        notifySuccess(response.message)
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
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Users</h1>
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
                        pageData?.map((obj,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(currentPage-1)*limit+(i+1)}</td>
                                    <td className="px-4 py-2">{obj.name}</td>
                                    <td className="px-4 py-2">{obj.email}</td>
                                    <td className="px-4 py-2">{obj.phone}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex">
                                            <button className="neumorphic-navBtn  py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/admin/users/view/${obj._id}`)}>
                                                <img src="/src/assets/icons/eye.png" alt="Button Icon"  />
                                            </button>
                                           <button className={`${obj.is_blocked ? "neumorphic-clicked bg-red-950" : "neumorphic-navBtn"}  py-2 px-2 ml-1 w-8 h-8 rounded-lg`} onClick={() =>handleBlocking && handleBlocking(!obj.is_blocked,obj._id)}>
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

export default ListUsers
