import Header from "../../components/admin/Header"
import DoctorNavigationBar from '../../components/doctor/DoctorNavigationBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { PrescriptionPopulateData } from "../../types/doctorTypes"
import { getPatientPrescription } from "../../api/doctor/doctorPrescripton"
import PatientPrescription from "../../components/common/PatientPrescription"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"

function PatientPrescriptionPage() {
    const doctorId = useSelector((state:RootState)=> state.doctor._id)
    const [list,setList] = useState<PrescriptionPopulateData[]>([])
    const [pageData,setPageData] = useState<PrescriptionPopulateData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const limit = 1
    const pageCount = Math.ceil(list.length/limit)   
    const {_id} = useParams()

    useEffect(()=>{
      getPatientPrescription(_id as string).then((res)=>{
        setList(res.data)
        setPageData(res.data.slice(0,limit))
        setPages(createInitialPages(res.data.length/limit))
      }).catch((err)=>{
        console.log(err.message)
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
    <Header navigation='/doctor/profile' _id={doctorId} />
      <div className="flex mt-6 bg-transparent">
        <DoctorNavigationBar/>
        <div className="neumorphic py-2 px-2 ml-6 w-screen ">
          <div className="flex justify-center">
            <h1 className="text-2xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Patient Prescriptions</h1>
          </div>
          <div className="p-2">
            {
              pageData.map((prescription,i)=>{
                return(
                  <PatientPrescription key={i} prescription={prescription}/>
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
      </div>
  </>
  )
}

export default PatientPrescriptionPage
