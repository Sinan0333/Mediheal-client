import { useEffect,useState } from "react"
import { PatientData } from "../../types/userTypes"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { getUserPatientsApi } from "../../api/user/patient"
import PatientCard from "./PatientCard"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import Pagination from "../common/Pagination"
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
        <div className="ml-20 mr-20 flex flex-wrap overflow-x-auto justify-evenly ">
                
          {
            pageData.map((pat)=>{ 
              return(
                <PatientCard _id={pat._id} firstName={pat.firstName} secondName={pat.secondName} image={pat.image} dob={pat.dob} age={pat.age} gender={pat.gender} bloodGroup={pat.bloodGroup}/>
              )
            })
          }
        </div>
        <div className="flex justify-center items-center mt-8">
        {
            pageCount > 1 ? <Pagination pages={pages} currentPage={currentPage} handleClick={handleClick} pageCount={pageCount}/> : null
        }
        </div>
     </>
    )
}

export default LIstUserPatients
