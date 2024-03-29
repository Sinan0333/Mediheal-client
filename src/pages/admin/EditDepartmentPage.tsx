import EditDepartmentForm from "../../components/admin/EditDepartmentForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"

function EditDepartmentPage() {
    return (
        <>
        <Header navigation='/profile'/>
          <div className="flex mt-6 bg-transparent">
            <Navigation/>
            <EditDepartmentForm/>
          </div>
        </>
      )
}

export default EditDepartmentPage
