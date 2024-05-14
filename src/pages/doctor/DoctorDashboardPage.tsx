import { useSelector } from "react-redux"
import Header from "../../components/admin/Header"
import DoctorDashboard from "../../components/doctor/DoctorDashboard"
import DoctorNavigationBar from "../../components/doctor/DoctorNavigationBar"
import { RootState } from "../../store/store"
import { useState } from "react"

function DoctorDashboardPage() {
  const _id = useSelector((state:RootState)=> state.doctor._id)
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  return (
    <>
      <Header navigation='/doctor/profile' _id={_id} setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
        <div className="flex mt-6 bg-transparent">
          <DoctorNavigationBar isNavigationOpen={isNavigationOpen}/>
          <DoctorDashboard/>
        </div>
    </>
  )
}

export default DoctorDashboardPage
