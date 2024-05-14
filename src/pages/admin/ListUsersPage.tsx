import { useState } from "react"
import Header from "../../components/admin/Header"
import ListUsers from "../../components/admin/ListUsers"
import Navigation from "../../components/admin/Navigation"

function ListUsersPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ListUsers/>
      </div>
    </>
  )
}

export default ListUsersPage
