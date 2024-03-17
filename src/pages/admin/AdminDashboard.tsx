import AddDepartmentForm from "../../components/admin/AddDepartmentForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/common/Navigation"

function AdminDashboard() {
  return (
    <>
      <Header/>
        <div className="flex mt-6 bg-transparent">
          <Navigation/>
          <AddDepartmentForm/>
        </div>
    </>
  )
}

export default AdminDashboard
