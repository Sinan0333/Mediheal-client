import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import  Actions from '../admin/Actions'
import { changeBlockStatus, listDoctorsApi } from "../../api/doctor/doctorApi"
import { DoctorData } from "../../types/doctorTypes"
import { notifyError, notifySuccess } from "../../constants/toast"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { ResponseData } from "../../types/commonTypes"

function ListDoctors() {
    const navigate = useNavigate()
    const [list,setList] = useState<DoctorData[] >([])
    const [pageData,setPageData] = useState<DoctorData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const limit = 13
    const pageCount = Math.ceil(list.length/limit)   

    useEffect(()=>{
        listDoctorsApi().then((res)=>{
            setList(res.data)
            setPageData(res.data.slice(0,limit))
            setPages(createInitialPages(res.data.length/limit))
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

    const handleBlocking = async(is_blocked:boolean,_id:string)=>{

        const response = await changeBlockStatus(_id,is_blocked) 
        if(!response.status) notifyError(response.message) 
        
        const response2:ResponseData = await listDoctorsApi()
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
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Doctors</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>navigate('/admin/doctors/add')}>Add</button>
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
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
                        pageData.map((doc,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(currentPage-1)*limit+(i+1)}</td>
                                    <td className="px-4 py-2">{doc.firstName + doc.secondName}</td>
                                    <td className="px-4 py-2">{doc.department.name}</td>
                                    <td className="px-4 py-2">{doc.phone}</td>
                                    <td className="px-4 py-2">{doc.email}</td>
                                    <td className="px-4 py-2"><Actions viewNav={`/admin/doctors/view/${doc._id}`} editNav={`/admin/doctors/edit/${doc._id}`} _id={doc._id} is_blocked={doc.is_blocked} handleBlock={handleBlocking}/></td>
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

export default ListDoctors
