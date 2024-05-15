import { useState } from "react"
import AssignPatientForm from "../../components/admin/AssignPatientForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"


function AssignPatientPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <div className="p-3 bg-[#e0e0e0] ">
      <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <AssignPatientForm/>
      </div>
    </div>
  )
}

export default AssignPatientPage
