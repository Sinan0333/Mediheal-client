import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewPatient from "../../components/common/ViewPatient"

function ViewPatientPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <ViewPatient/>
      </div>
    </>
  )
}

export default ViewPatientPage
