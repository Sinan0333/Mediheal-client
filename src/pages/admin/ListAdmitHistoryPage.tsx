import { useState } from "react"
import Header from "../../components/admin/Header"
import ListAdmitHistory from "../../components/admin/ListAdmitHistory"
import Navigation from "../../components/admin/Navigation"

function ListAdmitHistoryPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ListAdmitHistory/>
      </div>
    </>
  )
}

export default ListAdmitHistoryPage
