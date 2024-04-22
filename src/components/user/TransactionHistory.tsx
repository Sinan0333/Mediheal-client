import { useEffect, useState } from "react"
import { WalletHistoryData } from "../../types/userTypes"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { createInitialPages, handlePagination } from "../../constants/constFunctions"
import { getUserData } from "../../api/user/userApi"

function TransactionHistory() {
  const [list,setList] = useState<WalletHistoryData[]>([])
  const [wallet,setWallet] = useState<number>()
  const userId = useSelector((state:RootState)=>state.user._id)
  const [pageData,setPageData] = useState<WalletHistoryData[]>([])
  const [pages,setPages] = useState<number[]>([])
  const [currentPage,setCurrentPage] = useState<number>(1)
  const limit = 13
  const pageCount = Math.ceil(list.length/limit)   

  useEffect(()=>{
    getUserData(userId).then((res)=>{
      setList(res.data.history)
      setWallet(res.data.wallet)
      setPageData(res.data.history.slice(0,limit))
      setPages(createInitialPages(res.data.history.length/limit))
    }).catch((err:any)=>{
      console.log(err.message);
    })
  })

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
  <div className="flex-1 h-98   mx-auto md:mx-0  md:mb-0  dark:bg-zinc-700 p-4 rounded-lg " >
    <div className="w-full h-98 flex flex-col  items-center">
      <div className="flex justify-between w-full mb-4">
        <h1 className="font-bold">Transaction History</h1>
        <h1 className="font-bold">Balance: {wallet}</h1>
      </div>
      <div className="overflow-x-auto w-full" style={{scrollbarWidth:"none"}}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr >
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
          {
            pageData.map((obj,i)=>{
              return(
                <tr key={i} className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(obj.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{obj.description}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${obj.amount < 0 ? "text-red-600" : "text-green-600"}`}>₹ {obj.amount}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
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
  </div>
  )
}

export default TransactionHistory
