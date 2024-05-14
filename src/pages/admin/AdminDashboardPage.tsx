import { useState } from "react"
import AdminDashboard from "../../components/admin/AdminDashboard"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"


function AdminDashboardPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <AdminDashboard/>
      </div>
    </>
  )
}

export default AdminDashboardPage
