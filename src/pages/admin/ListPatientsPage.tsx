import { useState } from "react"
import Header from "../../components/admin/Header"
import ListPatients from "../../components/admin/ListPatients"
import Navigation from "../../components/admin/Navigation"

function ListPatientsPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <div className="p-3 bg-[#e0e0e0] ">
      <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ListPatients/>
      </div>
    </div>
  )
}

export default ListPatientsPage
