import {Routes,Route} from 'react-router-dom'
import Header from "../../components/admin/Header"
import DoctorNavigationBar from '../../components/doctor/DoctorNavigationBar'
import ListPatients from '../../components/doctor/ListPatients'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import ViewDoctor from '../../components/doctor/ViewDoctor'
import EditDoctor from '../../components/doctor/EditDoctor'

function DoctorPatients() {

  const _id = useSelector((state:RootState)=> state.doctor._id)

  return (
    <>
      <Header navigation='/doctor/patients/profile' _id={_id} />
        <div className="flex mt-6 bg-transparent">
          <DoctorNavigationBar/>
          <Routes>
            <Route path='/' element={<ListPatients/>} />
            <Route path='/profile/:_id' element={<ViewDoctor upBtn={true}/>} />
            <Route path='/profile/edit/:_id' element={<EditDoctor/>} />
          </Routes>
        </div>
    </>
  )
}

export default DoctorPatients
