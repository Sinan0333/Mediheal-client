import { useState } from "react"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewPatient from "../../components/common/ViewPatient"

function ViewPatientPage() {  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <div className="p-3 bg-[#e0e0e0] ">
      <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ViewPatient/>
      </div>
    </div>
  )
}

export default ViewPatientPage
