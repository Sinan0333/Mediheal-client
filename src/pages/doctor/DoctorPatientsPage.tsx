import Header from "../../components/admin/Header"
import DoctorNavigationBar from '../../components/doctor/DoctorNavigationBar'
import ListPatients from '../../components/doctor/ListPatients'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

function DoctorPatientsPage() {

  const _id = useSelector((state:RootState)=> state.doctor._id)

  return (
    <>
      <Header navigation='/doctor/profile' _id={_id} />
        <div className="flex mt-6 bg-transparent">
          <DoctorNavigationBar/>
          <ListPatients/>
        </div>
    </>
  )
}

export default DoctorPatientsPage
