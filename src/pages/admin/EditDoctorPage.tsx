import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import EditDoctor from "../../components/doctor/EditDoctor"

function EditDoctorPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <EditDoctor/>
      </div>
    </>
  )
}

export default EditDoctorPage
