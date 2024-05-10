import { useEffect,useState } from "react"
import DoctorCard from "../../components/user/DoctorCard"
import Nav from "../../components/user/Nav"
import { DoctorData } from "../../types/doctorTypes"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { unblockedDoctors } from "../../api/user/doctorApi"
import Pagination from "../../components/common/Pagination"
import { useLocation, useNavigate } from "react-router-dom"

function DoctorsList() {
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [list,setList] = useState<DoctorData[] >([])
  const [pages,setPages] = useState<number[]>([])
  const [currentPage,setCurrentPage] = useState<number>(1)

  const limit = 12
  const pageCount = pages.length

  const search = searchParams.get('search') || "default"
  const page:string | null | number = searchParams.get('page') || 1
  const query = `search=${search}&page=${page}`


  useEffect(()=>{
      unblockedDoctors(query).then((res)=>{
        setList(res.data)
        setPages(createInitialPages(res.data.length/limit))
      })
      .catch((err)=>{
          console.log(err.message);
      })
  },[query])

  const handleClick = async (i:number)=>{

    if(i<4){
        setPages(createInitialPages(pages.length/limit))
    }else{
        handlePagination(i,currentPage,pages,pageCount)
    }
    setCurrentPage(i)
    navigate(`/doctors?`+`search=${search}&page=${i}`)
}


  return (
   <>
   <Nav/>
   <div className="flex justify-center mt-5 mb-6">
        <h1 className="font-bold text-4xl text-adminBlue ">Our Doctors</h1>
   </div>
   <div className="flex justify-center">
      <div className="ml-20 mr-20 flex flex-wrap overflow-x-auto justify-evenly">   
        {
          list.map((doc)=>{ 
            return(
              <DoctorCard key={doc._id} _id={doc._id} firstName={doc.firstName} secondName={doc.secondName} experience={doc.experience}  department={doc.department}  image={doc.image} age={doc.age} gender={doc.gender} fees={doc.fees}/>
            )
          })
        }
      </div>
   </div>
   <div className="flex justify-center items-center mt-8">
    {
        pageCount > 1 ? <Pagination pages={pages} currentPage={currentPage} handleClick={handleClick} pageCount={pageCount}/> : null
    }
    </div>
   </>
  )
}

export default DoctorsList
