import AddDepartmentForm from "../../components/admin/AddDepartmentForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"


function AddDepartmentPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <AddDepartmentForm/>
      </div>
    </>
  )
}

export default AddDepartmentPage
