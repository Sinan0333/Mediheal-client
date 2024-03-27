import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/user/UserSignup'
import UserLogin from '../pages/user/UserLogin.tsx'
import DoctorsList from '../pages/user/DoctorsList.tsx'
import OtpVerification from '../pages/user/OtpVerification.tsx'
import Home from '../pages/user/Home.tsx'
import Account from '../pages/user/Account.tsx'

function UserRoutes() {
  return (
      <Routes>
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/doctors' element={<DoctorsList/>} />
          <Route path='/otp/:_id' element={<OtpVerification/>} />
      </Routes>

  )
}

export default UserRoutes