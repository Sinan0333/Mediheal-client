import AdminDashboard from "../../components/admin/AdminDashboard"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"


function AdminDashboardPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <AdminDashboard/>
      </div>
    </>
  )
}

export default AdminDashboardPage
