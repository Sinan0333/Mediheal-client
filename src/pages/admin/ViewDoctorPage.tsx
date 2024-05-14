import { useState } from "react"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewDoctor from "../../components/doctor/ViewDoctor"

function ViewDoctorPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ViewDoctor upBtn={true}/>
      </div>
    </>
  )
}

export default ViewDoctorPage
