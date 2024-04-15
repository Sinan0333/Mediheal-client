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
    </div></>
   
  )
}

export default Account
