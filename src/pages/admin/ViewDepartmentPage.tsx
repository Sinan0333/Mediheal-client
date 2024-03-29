import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import VIewDepartment from "../../components/admin/VIewDepartment"

function ViewDepartmentPage() {
  return (
    <>
    <Header navigation='/profile'/>
    <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <VIewDepartment/>
    </div>
</>
  )
}

export default ViewDepartmentPage
