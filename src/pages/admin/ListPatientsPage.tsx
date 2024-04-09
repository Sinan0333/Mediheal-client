import Header from "../../components/admin/Header"
import ListPatients from "../../components/admin/ListPatients"
import Navigation from "../../components/admin/Navigation"

function ListPatientsPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <ListPatients/>
      </div>
    </>
  )
}

export default ListPatientsPage
