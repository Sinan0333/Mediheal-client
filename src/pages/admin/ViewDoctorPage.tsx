import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewDoctor from "../../components/doctor/ViewDoctor"

function ViewDoctorPage() {
  return (
    <>
        <Header navigation='/profile'/>
        <div className="flex mt-6 bg-transparent">
            <Navigation/>
            <ViewDoctor upBtn={true}/>
        </div>
    </>
  )
}

export default ViewDoctorPage
