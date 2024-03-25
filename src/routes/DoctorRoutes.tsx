import {Routes,Route} from 'react-router-dom'
import DoctorPatients from '../pages/doctor/DoctorPatients'
import DoctorLogin from '../pages/doctor/DoctorLogin'

function DoctorRoutes() {
  return (
    <Routes>
        <Route path='/login' element={<DoctorLogin/>} />
        <Route path='/patients/*' element={<DoctorPatients/>} />
    </Routes>
  )
}

export default DoctorRoutes