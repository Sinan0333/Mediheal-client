import AssignPatientForm from "../../components/admin/AssignPatientForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"


function AssignPatientPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <AssignPatientForm/>
      </div>
    </>
  )
}

export default AssignPatientPage
