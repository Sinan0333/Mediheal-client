import EditProfile from "../../components/user/EditProfile"
import Nav from "../../components/user/Nav"
import UserProfile from "../../components/user/UserProfile"

function Account() {
  return (
    <>
    <Nav/>
     <div className="m-44  flex justify-center">
      <UserProfile/>
      <EditProfile/>
    </div></>
   
  )
}

export default Account
