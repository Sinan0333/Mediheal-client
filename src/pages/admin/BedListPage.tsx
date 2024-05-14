import { useState } from "react"
import Header from "../../components/admin/Header"
import ListBeds from "../../components/admin/ListBeds"
import Navigation from "../../components/admin/Navigation"


function BedListPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  return (
    <>
    <Header navigation='/profile' setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <ListBeds/>
      </div>
    </>
  )
}

export default BedListPage
