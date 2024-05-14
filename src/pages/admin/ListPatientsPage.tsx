import { useState } from "react"
import Header from "../../components/admin/Header"
import ListPatients from "../../components/admin/ListPatients"
import Navigation from "../../components/admin/Navigation"

function ListPatientsPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ListPatients/>
      </div>
    </>
  )
}

export default ListPatientsPage
