import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewUser from "../../components/admin/ViewUser"

function ViewUserPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <ViewUser/>
      </div>
    </>
  )
}

export default ViewUserPage
