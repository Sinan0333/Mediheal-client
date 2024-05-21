import { useEffect, useState } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import { BedDataType} from "../../types/adminTypes"
import Actions from "./Actions"
import { notifyError, notifySuccess } from "../../constants/toast"
import { changeBedBlock, getAllBeds, totalBeds } from "../../api/admin/bedManagementApi"
import { isObject } from "@cloudinary/url-gen/backwards/utils/isObject"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { ResponseData } from "../../types/commonTypes"
import Filter from "../common/Filter"
import { BedSortByData, BedTYpes } from "../../constants/constValues"
import Pagination from "../common/Pagination"
import ConfirmationModal from "./ConfirmationModal"

function ListBeds() {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [list,setList] = useState<BedDataType[] >([])
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
        getAllBeds(query).then((res)=>{     
            setList(res.data) 
        }) 
        totalBeds(query).then((res)=>{
            setPages(createInitialPages(res.data/limit))
        })
        .catch((err)=>{
            console.log(err.message);
        })
    },[query])

    const handleBlocking = async()=>{

        const response = await changeBedBlock(selectedData._id,selectedData.is_blocked) 
        if(!response.status) notifyError(response.message) 
        
        const response2:ResponseData = await getAllBeds(query)
        setList(response2.data)   
        notifySuccess(response.message)  
    }

    const handleClick = async (i:number)=>{

        if(i<4){
            setPages(createInitialPages(pages.length))
        }else{
            handlePagination(i,currentPage,pages,pageCount)
        }
        setCurrentPage(i)
        navigate("/admin/bed?"+`search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${i}`)
    }

  return (
    <div className="neumorphic py-2 px-2 w-screen min-h-screen pl-4 pt-4 lg:ml-64">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Bed Space</h1>
        <button className="neumorphic-navBtn px-4 h-8 ml-2 sm:ml-4 font-semibold text-adminBlue float-right" onClick={()=>navigate('/admin/bed/assign')}>Assign Patient</button>
        <button className="neumorphic-navBtn px-4 h-8 ml-2 sm:ml-4 font-semibold text-adminBlue float-right" onClick={()=>navigate('/admin/bed/add')}>Add</button>
        <button className="neumorphic-navBtn px-4 h-8 font-semibold text-adminBlue float-right" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Filter</button>
        {
            isConfirmationOpen ? <ConfirmationModal isConfirmationModalOpen={isConfirmationOpen} setIsConfirmationModalOpen={setIsConfirmationOpen} onConfirm={handleBlocking} message={"Are you sure you want to block this Bed?"}/> : null
        }
        {
            isFilterOpen?<Filter baseUrl="/admin/bed" searchInput={false}  chargeInput={true} filterData={BedTYpes} filterInputName="Type" sortData={BedSortByData} sortInputName="Sort By" isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>:null
        }
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">PatientID</th>
                        <th className="px-4 py-2 text-left w-auto">Bed Type</th>
                        <th className="px-4 py-2 text-left w-auto">Charge</th>
                        <th className="px-4 py-2 text-left w-auto">Assign Date</th>
                        <th className="px-4 py-2 text-left w-auto">Discharge Date</th>
                        <th className="px-4 py-2 text-left w-auto">Assign By</th>
                        <th className="px-4 py-2 text-left w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((obj:BedDataType,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(typeof(page) === 'number')?(page-1)*(limit+(i+1)):(i-1)*limit+(i+1)}</td>
                                    {isObject(obj.patient) ? <td className="px-4 py-2">{obj.patient.id  }</td> : <td className="px-4 py-2">{obj.patient || ''}</td>}
                                    <td className="px-4 py-2">{obj.type}</td>
                                    <td className="px-4 py-2">{obj.charge}</td>
                                    {obj.assignDate ? <td className="px-4 py-2">{new Date(obj.assignDate).toDateString()}</td> : <td className="px-4 py-2"></td>}
                                    {obj.dischargeDate ? <td className="px-4 py-2">{new Date(obj.dischargeDate).toDateString()}</td> : <td className="px-4 py-2"></td>}
                                    {obj.assignBy ? <td className="px-4 py-2">{typeof(obj?.assignBy) === 'object' ? obj.assignBy.firstName+obj.assignBy.secondName : ""}</td> : <td className="px-4 py-2"></td>}
                                    <td className="px-4 py-2"><Actions viewNav={`/admin/bed/view/${obj._id}`} editNav={`/admin/bed/edit/${obj._id}`}  _id={obj._id} setIsConfirmationModalOpen={setIsConfirmationOpen} setSelectedData={setSelectedData} is_blocked={obj.is_blocked}/></td>
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

export default ListBeds
