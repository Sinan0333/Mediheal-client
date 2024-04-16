import { useEffect, useState } from "react"
import { WalletHistoryData } from "../../types/userTypes"
import { getUserDataApi } from "../../api/user/UserManagment"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function TransactionHistory() {
  const [list,setList] = useState<WalletHistoryData[]>()
  const [wallet,setWallet] = useState<number>()
  const userId = useSelector((state:RootState)=>state.user._id)

  useEffect(()=>{
    getUserDataApi(userId).then((res)=>{
      setList(res.data.history)
      setWallet(res.data.wallet)
    }).catch((err:any)=>{
      console.log(err.message);
    })
  })

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
            list?.map((obj)=>{
              return(
                <tr className="bg-gray-50">
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
  </div>
  )
}

export default TransactionHistory
