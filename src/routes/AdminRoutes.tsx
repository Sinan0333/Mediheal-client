import  { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminIsLoggedIn, AdminIsLoggedOut } from '../components/common/ProductRoutes';
import Error404 from '../pages/common/Error404';
import AdminSideLoading from '../components/admin/AdminSideLoading';


const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const ListDoctorsPage = lazy(() => import('../pages/admin/ListDoctorsPage'));
const ViewDoctorPage = lazy(() => import('../pages/admin/ViewDoctorPage'));
const EditDoctorPage = lazy(() => import('../pages/admin/EditDoctorPage'));
const AddDoctorPage = lazy(() => import('../pages/admin/AddDoctorPage'));
const DepartmentListPage = lazy(() => import('../pages/admin/DepartmentListPage'));
const AddDepartmentPage = lazy(() => import('../pages/admin/AddDepartmentPage'));
const ListUsersPage = lazy(() => import('../pages/admin/ListUsersPage'));
const ViewUserPage = lazy(() => import('../pages/admin/ViewUserPage'));
const EditDepartmentPage = lazy(() => import('../pages/admin/EditDepartmentPage'));
const ViewDepartmentPage = lazy(() => import('../pages/admin/ViewDepartmentPage'));
const AddBedPage = lazy(() => import('../pages/admin/AddBedPage'));
const BedListPage = lazy(() => import('../pages/admin/BedListPage'));
const AssignPatientPage = lazy(() => import('../pages/admin/AssignPatientPage'));
const ViewBedPage = lazy(() => import('../pages/admin/ViewBedPage'));
const EditBedPage = lazy(() => import('../pages/admin/EditBedPage'));
const ListPatientsPage = lazy(() => import('../pages/admin/ListPatientsPage'));
const ViewPatientPage = lazy(() => import('../pages/admin/ViewPatientPage'));
const ListAdmitHistoryPage = lazy(() => import('../pages/admin/ListAdmitHistoryPage'));
const ViewAdmitHistoryPage = lazy(() => import('../pages/admin/ViewAdmitHistoryPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const PatientPrescriptionPage = lazy(() => import('../pages/admin/PatientPrescriptionPage'));

function AdminRoutes() {
  return (
    <Suspense fallback={<AdminSideLoading/>}>
      <Routes>
        <Route path='' element={<AdminIsLoggedOut />}>
          <Route path='/login' element={<AdminLogin />} />
        </Route>

        <Route path='/' element={<AdminIsLoggedIn />}>
          <Route path='/' element={<AdminDashboardPage />} />
          <Route path='/dashboard' element={<AdminDashboardPage />} />

          <Route path='/doctors' element={<ListDoctorsPage />} />
          <Route path='/doctors/add' element={<AddDoctorPage />} />
          <Route path='/doctors/view/:_id' element={<ViewDoctorPage />} />
          <Route path='/doctors/edit/:_id' element={<EditDoctorPage />} />

          <Route path='/departments' element={<DepartmentListPage />} />
          <Route path='/departments/add' element={<AddDepartmentPage />} />
          <Route path='/departments/view/:_id' element={<ViewDepartmentPage />} />
          <Route path='/departments/edit/:_id' element={<EditDepartmentPage />} />

          <Route path='/users' element={<ListUsersPage />} />
          <Route path='/users/view/:_id' element={<ViewUserPage />} />

          <Route path='/bed' element={<BedListPage />} />
          <Route path='/bed/add' element={<AddBedPage />} />
          <Route path='/bed/edit/:_id' element={<EditBedPage />} />
          <Route path='/bed/view/:_id' element={<ViewBedPage />} />
          <Route path='/bed/assign' element={<AssignPatientPage />} />

          <Route path='/admit_history' element={<ListAdmitHistoryPage />} />
          <Route path='/admit_history/view/:_id' element={<ViewAdmitHistoryPage />} />

          <Route path='/patient' element={<ListPatientsPage />} />
          <Route path='/patients/view/:_id' element={<ViewPatientPage />} />
          <Route path='/prescription/patient/:_id' element={<PatientPrescriptionPage />} />

          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AdminRoutes;
