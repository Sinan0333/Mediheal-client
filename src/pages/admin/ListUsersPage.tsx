import Header from "../../components/admin/Header"
import ListUsers from "../../components/admin/ListUsers"
import Navigation from "../../components/admin/Navigation"

function ListUsersPage() {
  return (
    <>
    <Header navigation='/profile'/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <ListUsers/>
      </div>
    </>
  )
}

export default ListUsersPage
