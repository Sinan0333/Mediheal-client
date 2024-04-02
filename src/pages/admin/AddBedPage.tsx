import AddBedForm from "../../components/admin/AddBedForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"

function AddBedPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <AddBedForm/>
      </div>
    </>
  )
}

export default AddBedPage
