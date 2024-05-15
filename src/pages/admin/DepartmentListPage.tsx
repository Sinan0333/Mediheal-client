import { useState } from "react"
import Header from "../../components/admin/Header"
import ListDepartments from "../../components/admin/ListDepartments"
import Navigation from "../../components/admin/Navigation"

function DepartmentListPage() {
  
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <div className="p-3 bg-[#e0e0e0] ">
      <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ListDepartments/>
      </div>
    </div>
  )
}

export default DepartmentListPage
