import  { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DoctorIsLoggedIn, DoctorIsLoggedOut } from '../components/common/ProductRoutes';
import Error404 from '../pages/common/Error404';
import AdminSideLoading from '../components/admin/AdminSideLoading';

const DoctorLogin = lazy(() => import('../pages/doctor/DoctorLogin'));
const ViewDoctorProfilePage = lazy(() => import('../pages/doctor/ViewDoctorProfilePage'));
const EditDoctorProfilePage = lazy(() => import('../pages/doctor/EditDoctorProfilePage'));
const ListPatientsPage = lazy(() => import('../pages/doctor/ListPatientsPage'));
const ListAppointmentsPage = lazy(() => import('../pages/doctor/ListAppointmentsPage'));
const ViewPatientPage = lazy(() => import('../pages/doctor/ViewPatientPage'));
const ViewSchedulePage = lazy(() => import('../pages/doctor/ViewSchedulePage'));
const AddPrescriptionPage = lazy(() => import('../pages/doctor/AddPrescriptionPage'));
const DoctorSideChat = lazy(() => import('../components/doctor/DoctorSideChat'));
const VideoCall = lazy(() => import('../components/common/VideoCall'));
const PatientPrescriptionPage = lazy(() => import('../pages/doctor/PatientPrescriptionPage'));
const DoctorDashboardPage = lazy(() => import('../pages/doctor/DoctorDashboardPage'));

function DoctorRoutes() {
  return (
    <Suspense fallback={<AdminSideLoading/>}>
      <Routes>
        <Route path='' element={<DoctorIsLoggedOut />}>
          <Route path='/login' element={<DoctorLogin />} />
        </Route>
        <Route path='' element={<DoctorIsLoggedIn />}>
          <Route path='/' element={<DoctorDashboardPage />} />
          <Route path='/dashboard' element={<DoctorDashboardPage />} />
          <Route path='/patients' element={<ListPatientsPage />} />
          <Route path='/patients/view/:_id' element={<ViewPatientPage />} />
          <Route path='/appointments' element={<ListAppointmentsPage />} />
          <Route path='/appointments/prescription/add/:patId/:_id' element={<AddPrescriptionPage />} />
          <Route path='/prescription/patient/:_id' element={<PatientPrescriptionPage />} />
          <Route path='/profile/:_id' element={<ViewDoctorProfilePage />} />
          <Route path='/profile/edit/:_id' element={<EditDoctorProfilePage />} />
          <Route path='/schedule' element={<ViewSchedulePage />} />
          <Route path='/chat/:patId/:_id' element={<DoctorSideChat />} />
          <Route path='/call/:_id' element={<VideoCall />} />
          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default DoctorRoutes;
