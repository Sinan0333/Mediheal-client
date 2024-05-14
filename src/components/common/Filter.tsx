import { useState } from "react"
import { useNavigate } from "react-router-dom"

type filterProps = {
    baseUrl:string
    searchInput:boolean
    chargeInput?:boolean
    filterData?:any
    filterInputName?:string
    sortData?:any
    sortInputName?:string
    isFilterOpen:boolean
    setIsFilterOpen:(value:boolean)=>void
}
function Filter({baseUrl,searchInput,chargeInput,filterData,filterInputName,sortData,sortInputName,isFilterOpen,setIsFilterOpen}:filterProps) {
    const [searchText,setSearchText] = useState<string>("")
    const [chargeValue,setChargeValue] = useState<number>(0)
    const [selectedFilter,setSelectedFilter] = useState<string>("")
    const [selectedSortBy,setSelectedSortBy] = useState<string>("")
    const [selectedSortIn,setSelectedSortIn] = useState<number>(0)
    const navigate = useNavigate()

    const handleSubmit = ()=>{
        let search:string = 'default'
        let charge:string | number = 'default'
        let filterValue:string = 'default'
        let sortBy:string = 'default'
        let sortIn:number | string = 'default'

        if(searchInput && searchText.length>0){
            search = searchText
        }
        if(chargeInput && chargeValue>0){
            charge = chargeValue
        }
        if(filterData && selectedFilter.length>0){
            filterValue = selectedFilter
        }
        if(sortData && selectedSortBy.length>0){
            sortBy = selectedSortBy
        }
        if(sortData && selectedSortIn!==0){
            sortIn = selectedSortIn
        }        
        baseUrl+= `?search=${search}&charge=${charge}&filterData=${filterValue}&sortBy=${sortBy}&sortIn=${sortIn}&page=1`
        navigate(baseUrl)
        setIsFilterOpen(!isFilterOpen)
        
    }
  return (
    <div className="w-full flex justify-evenly">
        <div className="m-10 w-screen max-w-screen-md absolute ">
            <div className="flex flex-col ">
                <div className="rounded-xl border border-gray-200 neumorphic p-6 shadow-lg">
                    {searchInput &&
                        <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                            <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" className=""></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                            </svg>
                            <input type="name" name="search" className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search..." onChange={(e)=>setSearchText(e.target.value)}/>
                        </div>
                    }

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {chargeInput &&
                            <div className="flex flex-col">
                                <label htmlFor="Charge" className="text-sm font-medium text-stone-600">Charge</label>
                                <input type="number" id="name" placeholder="" className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" onChange={(e)=>setChargeValue(parseInt(e.target.value))}/>
                            </div>
                        }
                        {filterData &&
                            <div className="flex flex-col">
                                <label htmlFor="Type" className="text-sm font-medium text-stone-600">{filterInputName}</label>
                                <select id="manufacturer" className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" onChange={(e)=>setSelectedFilter(e.target.value)}>
                                    <option value="">All</option>
                                    {
                                        filterData.map((data:any,i:number)=>{
                                            return <option key={i} value={data._id}>{data.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        }
                        {sortData &&
                            <div className="flex flex-col">
                                <label htmlFor="Sort By" className="text-sm font-medium text-stone-600">{sortInputName}</label>
                                <select id="manufacturer" className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" onChange={(e)=>setSelectedSortBy(e.target.value)}>
                                    <option value="">Non</option>
                                    {
                                        sortData.map((data:any,i:number)=>{
                                            return <option key={i} value={data._id}>{data.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        }
                        {sortData &&
                            <div className="flex flex-col">
                                <label htmlFor="status" className="text-sm font-medium text-stone-600">Sort in</label>
                                <select id="status" className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" onChange={(e)=>setSelectedSortIn(parseInt(e.target.value))}>
                                <option value={0}>Non</option>
                                <option value={1}>Small to large</option>
                                <option value={-1}>Large to small</option>
                                </select>
                            </div>
                        }

                    </div>

                    <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                        <button className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring" onClick={()=>setIsFilterOpen(!isFilterOpen)}>Cancel</button>
                        <button className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Filter
