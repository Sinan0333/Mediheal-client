import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/user/UserSignup'
import UserLogin from '../pages/user/UserLogin.tsx'
import DoctorsList from '../pages/user/DoctorsList.tsx'
import OtpVerification from '../pages/user/OtpVerification.tsx'
import Home from '../pages/user/Home.tsx'
import Profile from '../pages/user/Profile.tsx'
import { UserIsLoggedIn, UserIsLoggedOut } from '../components/common/ProductRoutes.tsx'
import Error404 from '../pages/common/Error404.tsx'
import DoctorDetailsPage from '../pages/user/DoctorDetailsPage.tsx'
import PaymentSuccess from '../components/user/PaymentSuccess.tsx'
import CancelPage from '../components/user/CancelPage.tsx'
import Sample from '../components/common/Sample.tsx'
import BookingHistoryPage from '../pages/user/BookingHistoryPage.tsx'
import TransactionHistoryPage from '../pages/user/TransactionHistoryPage.tsx'
import PatientsPage from '../pages/user/PatientsPage.tsx'
import UserSideChat from '../pages/user/UserSideChat.tsx'
import VideoCall from '../components/common/VideoCall.tsx'
import ViewPrescriptionPage from '../pages/user/ViewPrescriptionPage.tsx'
import EditPatientPage from '../pages/user/EditPatientPage.tsx'

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

          <Route path='/account/profile' element={<Profile/>} />
          <Route path='/account/booking_history' element={<BookingHistoryPage/>} />
          <Route path='/account/patients' element={<PatientsPage/>} />
          <Route path='/account/patients/edit/:_id' element={<EditPatientPage/>} />
          <Route path='/account/wallet' element={<TransactionHistoryPage/>} />
          <Route path='/account/prescription/:_id' element={<ViewPrescriptionPage/>} />

          <Route path='/doctors' element={<DoctorsList/>} />
          <Route path='/doctors/details/:_id' element={<DoctorDetailsPage/>} />

          <Route path='/payment_success' element={<PaymentSuccess/>}/>
          <Route path='/payment_cancel' element={<CancelPage/>}/>

          <Route path='/sample' element={<Sample/>}/>
          <Route path='/chat/:chatId/:patId' element={<UserSideChat/>}/>
          <Route path='/call/:_id' element={<VideoCall/>}/>

          <Route path='*' element={<Error404/>} />

        </Route>

      </Routes>

  )
}

export default UserRoutes