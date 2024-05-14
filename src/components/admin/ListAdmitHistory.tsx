import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AdmitHistoryData} from "../../types/adminTypes"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { getAllAdmitHistory, totalAdmits } from "../../api/admin/admitHistoryApi"
import { eye } from "../../constants/icons"
import Pagination from "../common/Pagination"
import Filter from "../common/Filter"
import { BedSortByData, BedTYpes } from "../../constants/constValues"

function ListAdmitHistory() {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [list,setList] = useState<AdmitHistoryData[] >([])
    const [pages,setPages] = useState<number[]>([])
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [isFilterOpen,setIsFilterOpen] = useState<boolean>(false)

    const limit = 13
    const pageCount =  pages.length

    const search = searchParams.get('search') || "default"
    const charge = searchParams.get('charge') || "default"
    const filterData = searchParams.get('filterData') || "default"
    const sortBy = searchParams.get('sortBy') || "default"
    const sortIn = searchParams.get('sortIn') || "default"
    const page:string | null | number = searchParams.get('page') || 1
    const query = `search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${page}`
    
    useEffect(()=>{
        getAllAdmitHistory(query).then((res)=>{  
            setList(res.data)
        })
        totalAdmits(query).then((res)=>{
            setPages(createInitialPages(res.data/limit))
        }).catch((err)=>{
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
        navigate("/admin/admit_history"+`?search=${search}&charge=${charge}&filterData=${filterData}&sortBy=${sortBy}&sortIn=${sortIn}&page=${i}`)
    }

  return (
    <div className="neumorphic py-2 px-2  w-screen min-h-screen pl-4 pt-4 lg:ml-64">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Admit History</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Filter</button>
        {
            isFilterOpen?<Filter baseUrl="/admin/admit_history" searchInput={false}  chargeInput={true} filterData={BedTYpes} filterInputName="Type" sortData={BedSortByData} sortInputName="Sort By" isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>:null
        }
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">PatientID</th>
                        <th className="px-4 py-2 text-left w-auto">Bed Type</th>
                        <th className="px-4 py-2 text-left w-auto">Assign Date</th>
                        <th className="px-4 py-2 text-left w-auto">Discharge Date</th>
                        <th className="px-4 py-2 text-left w-auto">Assign By</th>
                        <th className="px-4 py-2 text-left w-auto">Total</th>
                        <th className="px-4 py-2 text-left w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((obj,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{(currentPage-1)*limit+(i+1)}</td>
                                    <td className="px-4 py-2">{obj.patient.id  }</td> 
                                    <td className="px-4 py-2">{obj.type}</td>
                                    <td className="px-4 py-2">{new Date(obj.assignDate).toDateString()}</td> 
                                    <td className="px-4 py-2">{new Date(obj.dischargeDate).toDateString()}</td>
                                    <td className="px-4 py-2">{obj.assignBy.firstName+obj.assignBy.secondName}</td>
                                    <td className="px-4 py-2">{obj.total}</td>
                                    <td className="px-4 py-2">
                                        <button className="neumorphic-navBtn mr-2 py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/admin/admit_history/view/${obj._id}`)}>
                                            <img className="w-full" src={eye} alt="Button Icon"  />
                                        </button>
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

export default ListAdmitHistory
