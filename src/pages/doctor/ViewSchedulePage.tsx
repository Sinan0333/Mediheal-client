import Header from "../../components/admin/Header"
import DoctorNavigationBar from '../../components/doctor/DoctorNavigationBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import ViewSchedule from "../../components/doctor/ViewSchedule"
import { useState } from "react"

function ViewSchedulePage() {
  const _id = useSelector((state:RootState)=> state.doctor._id)
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  return (
    <>
      <Header navigation='/doctor/profile' _id={_id} setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
        <div className="flex mt-6 bg-transparent">
          <DoctorNavigationBar isNavigationOpen={isNavigationOpen}/>
          <ViewSchedule/>
        </div>
    </>
  )
}

export default ViewSchedulePage
