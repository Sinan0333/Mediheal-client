import  { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserIsLoggedIn, UserIsLoggedOut } from '../components/common/ProductRoutes.tsx';
import Error404 from '../pages/common/Error404.tsx';
import UserSideLoading from '../components/user/UserSideLoading.tsx';

// Lazy load the components
const UserSignup = lazy(() => import('../pages/user/UserSignup'));
const UserLogin = lazy(() => import('../pages/user/UserLogin.tsx'));
const DoctorsList = lazy(() => import('../pages/user/DoctorsList.tsx'));
const OtpVerification = lazy(() => import('../pages/user/OtpVerification.tsx'));
const Home = lazy(() => import('../pages/user/Home.tsx'));
const Profile = lazy(() => import('../pages/user/Profile.tsx'));
const DoctorDetailsPage = lazy(() => import('../pages/user/DoctorDetailsPage.tsx'));
const PaymentSuccess = lazy(() => import('../components/user/PaymentSuccess.tsx'));
const CancelPage = lazy(() => import('../components/user/CancelPage.tsx'));
const BookingHistoryPage = lazy(() => import('../pages/user/BookingHistoryPage.tsx'));
const TransactionHistoryPage = lazy(() => import('../pages/user/TransactionHistoryPage.tsx'));
const PatientsPage = lazy(() => import('../pages/user/PatientsPage.tsx'));
const UserSideChat = lazy(() => import('../pages/user/UserSideChat.tsx'));
const VideoCall = lazy(() => import('../components/common/VideoCall.tsx'));
const ViewPrescriptionPage = lazy(() => import('../pages/user/ViewPrescriptionPage.tsx'));
const EditPatientPage = lazy(() => import('../pages/user/EditPatientPage.tsx'));

function UserRoutes() {
  return (
    <Suspense fallback={<UserSideLoading/>}>
      <Routes>
        <Route path='' element={<UserIsLoggedOut />}>
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/otp/:_id' element={<OtpVerification />} />
        </Route>

        <Route path='/' element={<UserIsLoggedIn />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />

          <Route path='/account/profile' element={<Profile />} />
          <Route path='/account/booking_history' element={<BookingHistoryPage />} />
          <Route path='/account/patients' element={<PatientsPage />} />
          <Route path='/account/patients/edit/:_id' element={<EditPatientPage />} />
          <Route path='/account/wallet' element={<TransactionHistoryPage />} />
          <Route path='/account/prescription/:_id' element={<ViewPrescriptionPage />} />

          <Route path='/doctors' element={<DoctorsList />} />
          <Route path='/doctors/details/:_id' element={<DoctorDetailsPage />} />

          <Route path='/payment_success' element={<PaymentSuccess />} />
          <Route path='/payment_cancel' element={<CancelPage />} />

          <Route path='/chat/:chatId/:patId' element={<UserSideChat />} />
          <Route path='/call/:_id' element={<VideoCall />} />

          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default UserRoutes;
