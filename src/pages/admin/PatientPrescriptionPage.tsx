import Header from "../../components/admin/Header"
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { PrescriptionPopulateData } from "../../types/doctorTypes"
import { getPatientPrescription } from "../../api/doctor/doctorPrescripton"
import PatientPrescription from "../../components/common/PatientPrescription"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import Pagination from "../../components/common/Pagination"
import Navigation from "../../components/admin/Navigation"


function PatientPrescriptionPage() {
    const doctorId = useSelector((state:RootState)=> state.doctor._id)
    const [list,setList] = useState<PrescriptionPopulateData[]>([])
    const [pageData,setPageData] = useState<PrescriptionPopulateData[]>([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [isNavigationOpen, setIsNavigationOpen] = useState(false)
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
    <div className="p-3 bg-[#e0e0e0] ">
      <Header navigation='/doctor/profile' _id={doctorId} setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
        <div className="mt-6">
          <Navigation isNavigationOpen={isNavigationOpen}/>
          <div className="neumorphic py-2 px-2 min-w-screen min-h-screen lg:ml-64">
            <div className="flex justify-center">
              <h1 className="text-2xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Patient Prescriptions</h1>
            </div>
              {
                pageData.map((prescription,i)=>{
                  return(
                    <PatientPrescription key={i} prescription={prescription}/>
                  )
                })
              }  
            <div className="flex justify-center items-center mt-8">
              {
                  pageCount > 1 ? <Pagination pages={pages} currentPage={currentPage} handleClick={handleClick} pageCount={pageCount}/> : null
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default PatientPrescriptionPage
