import Header from "../../components/admin/Header"
import DoctorNavigationBar from '../../components/doctor/DoctorNavigationBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import AddPrescription from "../../components/doctor/AddPrescription"

function AddPrescriptionPage() {
    const _id = useSelector((state:RootState)=> state.doctor._id)

    return (
      <>
        <Header navigation='/doctor/profile' _id={_id} />
          <div className="flex mt-6 bg-transparent">
            <DoctorNavigationBar/>
            <AddPrescription/>
          </div>
      </>
    )
}

export default AddPrescriptionPage
