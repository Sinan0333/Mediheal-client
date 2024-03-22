import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/user/UserSignup'
import UserLogin from '../pages/user/UserLogin.tsx'
import DoctorsList from '../pages/user/DoctorsList.tsx'

function UserRoutes() {
  return (
      <Routes>
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/doctors' element={<DoctorsList/>} />
      </Routes>

  )
}

export default UserRoutes