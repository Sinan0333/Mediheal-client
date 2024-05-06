import Header from "../../components/admin/Header"
import DoctorDashboard from "../../components/doctor/DoctorDashboard"
import DoctorNavigationBar from "../../components/doctor/DoctorNavigationBar"

function DoctorDashboardPage() {
    return (
        <>
        <Header navigation='/profile'/>
          <div className="flex mt-6 bg-transparent">
            <DoctorNavigationBar/>
            <DoctorDashboard/>
          </div>
        </>
      )
}

export default DoctorDashboardPage
