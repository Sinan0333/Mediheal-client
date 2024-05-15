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
      <div className="p-3 bg-[#e0e0e0] ">
        <Header navigation='/doctor/profile' _id={_id} setIsNavigationOpen={setIsNavigationOpen} isNavigationOpen={isNavigationOpen}/>
          <div className="flex mt-6 bg-transparent justify-center items-center">
            <DoctorNavigationBar isNavigationOpen={isNavigationOpen}/>
            <AddPrescription/>
          </div>
      </div>
    )
}

export default AddPrescriptionPage
