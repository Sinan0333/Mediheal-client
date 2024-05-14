import { useState } from "react"
import EditBed from "../../components/admin/EditBed"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"

function EditBedPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <EditBed/>
      </div>
    </>
  )
}

export default EditBedPage
