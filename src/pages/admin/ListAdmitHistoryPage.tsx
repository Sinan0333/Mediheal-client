import { useState } from "react"
import Header from "../../components/admin/Header"
import ListAdmitHistory from "../../components/admin/ListAdmitHistory"
import Navigation from "../../components/admin/Navigation"

function ListAdmitHistoryPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <div className="p-3 bg-[#e0e0e0] ">
      <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ListAdmitHistory/>
      </div>
    </div>
  )
}

export default ListAdmitHistoryPage
