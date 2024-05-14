import { useState } from "react"
import EditDepartmentForm from "../../components/admin/EditDepartmentForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"

function EditDepartmentPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <EditDepartmentForm/>
      </div>
    </>
  )
}

export default EditDepartmentPage
