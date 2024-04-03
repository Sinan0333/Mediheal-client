import Header from "../../components/admin/Header"
import ListBeds from "../../components/admin/ListBeds"
import Navigation from "../../components/admin/Navigation"


function BedListPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <ListBeds/>
      </div>
    </>
  )
}

export default BedListPage
