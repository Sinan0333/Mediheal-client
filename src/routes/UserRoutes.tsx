import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/user/UserSignup'
import UserLogin from '../pages/user/UserLogin.tsx'
import DoctorsList from '../pages/user/DoctorsList.tsx'
import OtpVerification from '../pages/user/OtpVerification.tsx'
import Home from '../pages/user/Home.tsx'
import Account from '../pages/user/Account.tsx'
import { UserIsLoggedIn, UserIsLoggedOut } from '../components/common/ProductRoutes.tsx'

function UserRoutes() {
  return (
      <Routes>

        <Route path='' element={<UserIsLoggedOut/>}>
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/otp/:_id' element={<OtpVerification/>} />
        </Route>

        <Route path='/' element={<UserIsLoggedIn/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/doctors' element={<DoctorsList/>} />
        </Route>

      </Routes>

  )
}

export default UserRoutes