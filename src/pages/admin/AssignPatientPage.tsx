import { useState } from "react"
import AssignPatientForm from "../../components/admin/AssignPatientForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"


function AssignPatientPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <AssignPatientForm/>
      </div>
    </>
  )
}

export default AssignPatientPage
