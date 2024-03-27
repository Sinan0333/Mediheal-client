import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import ListDoctors from '../../components/doctor/ListDoctors'

function ListDoctorsPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <ListDoctors/>
      </div>
    </>
  )
}

export default ListDoctorsPage
