import { useState } from "react"
import EditBed from "../../components/admin/EditBed"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function EditBedPage() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const _id = useSelector((state:RootState)=> state.admin._id)
  return (
    <div className="p-3 bg-[#e0e0e0] ">
      <Header navigation='/admin/profile' _id={_id} setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
      <div className="flex mt-6 bg-transparent">
        <Navigation isNavigationOpen={isNavigationOpen} />
        <EditBed/>
      </div>
    </div>
  )
}

export default EditBedPage
