import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ViewBed from "../../components/admin/ViewBed"

function ViewBedPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <ViewBed/>
      </div>
    </>
  )
}

export default ViewBedPage
