import { useEffect,useState } from "react"
import { PatientData } from "../../types/userTypes"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { getUserPatientsApi } from "../../api/user/patient"
import PatientCard from "./PatientCard"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
function LIstUserPatients() {
    const [list,setList] = useState<PatientData[] >([])
    const userId = useSelector((state:RootState)=>state.user._id)
    const [pageData,setPageData] = useState<PatientData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const limit = 4
    const pageCount = Math.ceil(list.length/limit)   

    useEffect(()=>{
        getUserPatientsApi(userId).then((res)=>{
            setList(res.data)
            setPageData(res.data.slice(0,limit))
            setPages(createInitialPages(res.data.length/limit))
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

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
     <>
     <div className="">
        <div className="ml-20 mr-20 flex flex-wrap overflow-x-auto justify-evenly">
                
          {
            pageData.map((pat)=>{ 
              return(
                <PatientCard _id={pat._id} firstName={pat.firstName} secondName={pat.secondName} image={pat.image} dob={pat.dob} age={pat.age} gender={pat.gender} />
              )
            })
          }
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
     </>
    )
}

export default LIstUserPatients
