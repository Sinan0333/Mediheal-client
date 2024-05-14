import Header from "../../components/admin/Header"
import DoctorNavigationBar from '../../components/doctor/DoctorNavigationBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import AddPrescription from "../../components/doctor/AddPrescription"
import { useState } from "react"

function AddPrescriptionPage() {
    const _id = useSelector((state:RootState)=> state.doctor._id)
    const [isNavigationOpen, setIsNavigationOpen] = useState(false)

    return (
      <>
        <Header navigation='/doctor/profile' _id={_id} setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
          <div className="flex mt-6 bg-transparent">
            <DoctorNavigationBar isNavigationOpen={isNavigationOpen}/>
            <AddPrescription/>
          </div>
      </>
    )
}

export default AddPrescriptionPage
