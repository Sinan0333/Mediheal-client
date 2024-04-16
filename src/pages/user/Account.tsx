import BookingHistory from "../../components/user/BookingHIstory"
import EditProfile from "../../components/user/EditProfile"
import Nav from "../../components/user/Nav"
import TransactionHistory from "../../components/user/TransactionHistory"
import UserProfile from "../../components/user/UserProfile"

function Account() {
  return (
    <>
    <Nav/>
     <div className="flex justify-between items-center mt-2 flex-wrap md:flex-nowrap p-6 bg-white dark:bg-zinc-800">
      <UserProfile/>
      <EditProfile/>
      <TransactionHistory/>
    </div>
    <hr className="border-t border-gray-500" />
    <div className="p-6">
      <div className="flex justify-center">
          <h1 className="font-bold text-adminBlue text-2xl">Booking History</h1>
      </div>
      <BookingHistory/>
    </div>
    </>
   
  )
}

export default Account
