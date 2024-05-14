import { useState } from "react"
import AddBedForm from "../../components/admin/AddBedForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"

function AddBedPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <AddBedForm/>
      </div>
    </>
  )
}

export default AddBedPage
