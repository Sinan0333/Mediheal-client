import {Routes,Route} from 'react-router-dom'
import DoctorLogin from '../pages/doctor/DoctorLogin'
import { DoctorIsLoggedIn, DoctorIsLoggedOut } from '../components/common/ProductRoutes'
import ViewDoctorProfilePage from '../pages/doctor/ViewDoctorProfilePage'
import EditDoctorProfilePage from '../pages/doctor/EditDoctorProfilePage'
import DoctorPatientsPage from '../pages/doctor/DoctorPatientsPage'
import Error404 from '../pages/common/Error404'

function DoctorRoutes() {
  return (
    <Routes>

      <Route path='' element={<DoctorIsLoggedOut/>}>
        <Route path='/login' element={<DoctorLogin/>} />
      </Route>
    
      <Route path='' element={<DoctorIsLoggedIn/>}>
        
        <Route path='/patients' element={<DoctorPatientsPage/>} />
        <Route path='/profile/:_id' element={<ViewDoctorProfilePage/>}/>
        <Route path='/profile/edit/:_id' element={<EditDoctorProfilePage/>}/>

        <Route path='*' element={<Error404/>} />

      </Route>

    </Routes>
  )
}

export default DoctorRoutes