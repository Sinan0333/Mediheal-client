import { useState } from "react"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewPatient from "../../components/common/ViewPatient"

function ViewPatientPage() {  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ViewPatient/>
      </div>
    </>
  )
}

export default ViewPatientPage
