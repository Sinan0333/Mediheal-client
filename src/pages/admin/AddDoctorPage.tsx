import { useState } from "react"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import AddDoctorForm from "../../components/doctor/AddDoctorForm"

function AddDoctorPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <AddDoctorForm/>
      </div>
    </>
  )
}

export default AddDoctorPage
