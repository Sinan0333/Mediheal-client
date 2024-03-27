import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import AddDoctorForm from "../../components/doctor/AddDoctorForm"

function AddDoctorPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <AddDoctorForm/>
      </div>
    </>
  )
}

export default AddDoctorPage
