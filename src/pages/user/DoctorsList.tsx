import { useEffect,useState } from "react"
import DoctorCard from "../../components/user/DoctorCard"
import Nav from "../../components/user/Nav"
import { DoctorData } from "../../types/doctorTypes"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { unblockedDoctors } from "../../api/user/doctorApi"



function DoctorsList() {
  const [list,setList] = useState<DoctorData[] >([])
  const [pageData,setPageData] = useState<DoctorData[]>([])
  const [pages,setPages] = useState<number[]>([])
  const [currentPage,setCurrentPage] = useState<number>(1)
  const limit = 12
  const pageCount = Math.ceil(list.length/limit)   

  useEffect(()=>{
      unblockedDoctors().then((res)=>{
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
   <Nav/>
   <div className="flex justify-center mt-5 mb-6">
        <h1 className="font-bold text-4xl text-adminBlue ">Our Doctors</h1>
   </div>
   <div className="flex justify-center">
      <div className="ml-20 mr-20 flex flex-wrap overflow-x-auto justify-evenly">   
        {
          pageData.map((doc)=>{ 
            return(
              <DoctorCard key={doc._id} _id={doc._id} firstName={doc.firstName} secondName={doc.secondName} experience={doc.experience}  department={doc.department}  image={doc.image} age={doc.age} gender={doc.gender} fees={doc.fees}/>
            )
          })
        }
      </div>
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
   </>
  )
}

export default DoctorsList
