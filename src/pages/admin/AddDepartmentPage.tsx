import { useState } from "react"
import AddDepartmentForm from "../../components/admin/AddDepartmentForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"


function AddDepartmentPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <AddDepartmentForm/>
      </div>
    </>
  )
}

export default AddDepartmentPage
