import EditBed from "../../components/admin/EditBed"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"

function EditBedPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <EditBed/>
      </div>
    </>
  )
}

export default EditBedPage
