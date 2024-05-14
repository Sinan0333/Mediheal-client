import { useState } from "react"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewBed from "../../components/admin/ViewBed"

function ViewBedPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ViewBed/>
      </div>
    </>
  )
}

export default ViewBedPage
