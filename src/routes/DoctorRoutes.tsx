import {Routes,Route} from 'react-router-dom'
import DoctorLogin from '../pages/doctor/DoctorLogin'
import { DoctorIsLoggedIn, DoctorIsLoggedOut } from '../components/common/ProductRoutes'
import ViewDoctorProfilePage from '../pages/doctor/ViewDoctorProfilePage'
import EditDoctorProfilePage from '../pages/doctor/EditDoctorProfilePage'
import Error404 from '../pages/common/Error404'
import ListPatientsPage from '../pages/doctor/ListPatientsPage'
import ListAppointmentsPage from '../pages/doctor/ListAppointmentsPage'
import ViewPatientPage from '../pages/doctor/ViewPatientPage'
import ViewSchedulePage from '../pages/doctor/ViewSchedulePage'
import AddPrescriptionPage from '../pages/doctor/AddPrescriptionPage'
import DoctorSideChat from '../components/doctor/DoctorSideChat'
import VideoCall from '../components/common/VideoCall'

function DoctorRoutes() {
  return (
    <Routes>

      <Route path='' element={<DoctorIsLoggedOut/>}>
        <Route path='/login' element={<DoctorLogin/>} />
      </Route>
    
      <Route path='' element={<DoctorIsLoggedIn/>}>
        
        <Route path='/patients' element={<ListPatientsPage/>} />
        <Route path='/patients/view/:_id' element={<ViewPatientPage/>} />

        <Route path='/appointments' element={<ListAppointmentsPage/>} />
        <Route path='/appointments/prescription/add/:patId/:_id' element={<AddPrescriptionPage/>} />

        <Route path='/profile/:_id' element={<ViewDoctorProfilePage/>}/>
        <Route path='/profile/edit/:_id' element={<EditDoctorProfilePage/>}/>
        
        <Route path='/schedule' element={<ViewSchedulePage/>}/>
        <Route path='/chat/:patId/:_id' element={<DoctorSideChat/>}/>
        <Route path='/call/:_id' element={<VideoCall/>}/>


        <Route path='*' element={<Error404/>} />

      </Route>

    </Routes>
  )
}

export default DoctorRoutes