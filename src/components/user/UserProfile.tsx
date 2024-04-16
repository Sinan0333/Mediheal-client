import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { logoutUser } from "../../store/slice/userSlice"

function UserProfile() {

    const dispatch = useDispatch()
    const userData = useSelector((state:RootState)=>state.user)
    const userImage = userData.image ? `https://res.cloudinary.com/dw2cscitl/${userData.image}` : '/src/assets/images/default_profile.jpg'

  return (
    <div className="flex-1 h-full max-w-md mx-auto md:mx-0 mb-6 md:mb-0 md:mr-6 dark:bg-zinc-700 p-4 rounded-lg">
        <div className="flex flex-col items-center pb-10">  
          <img className="w-32 h-32 object-cover rounded-full mb-4" src={userImage} alt="Profile avatar" />
          <h3 className="text-2xl font-semibold mb-2">{userData.name}</h3>
          <p className="text-zinc-600 dark:text-zinc-300 mb-1">Email: {userData.email}</p>
          <p className="text-zinc-600 dark:text-zinc-300 mb-4">Phone: {userData.phone}</p>
          <div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2" onClick={()=>dispatch(logoutUser())}>Logout</button>
          </div>
        </div>
        <div className="w-full h-72 flex flex-col  items-center">
          <div className="flex justify-between w-full mb-4">
            <h1 className="font-bold">Transaction History</h1>
            <h1 className="font-bold">Balance:500</h1>
          </div>
          <div className="overflow-x-auto " style={{scrollbarWidth:"none"}}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-17</td>
                  <td className="px-6 py-4 whitespace-nowrap">Payment foXZ r Product A</td>
                  <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
                  <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
                  <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
                  <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
                  <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-17</td>
                  <td className="px-6 py-4 whitespace-nowrap">Payment for Product A</td>
                  <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
                  <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
                  <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
                  <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
                  <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default UserProfile
