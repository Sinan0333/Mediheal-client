import Header from "../../components/admin/Header"
import DoctorNavigationBar from '../../components/doctor/DoctorNavigationBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import ViewDoctor from '../../components/doctor/ViewDoctor'


function ViewDoctorProfilePage() {

    const _id = useSelector((state:RootState)=> state.doctor._id)

  return (
     <>
      <Header navigation='/doctor/profile' _id={_id} />
        <div className="flex mt-6 bg-transparent">
          <DoctorNavigationBar/>
          <ViewDoctor upBtn={true}/>
        </div>
    </>
  )
}

export default ViewDoctorProfilePage
