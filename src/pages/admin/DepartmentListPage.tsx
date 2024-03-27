import Header from "../../components/admin/Header"
import ListDepartments from "../../components/admin/ListDepartments"
import Navigation from "../../components/admin/Navigation"

function DepartmentListPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <ListDepartments/>
      </div>
    </>
  )
}

export default DepartmentListPage
