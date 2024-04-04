import {Routes,Route} from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ListDoctorsPage from '../pages/admin/ListDoctorsPage'
import ViewDoctorPage from '../pages/admin/ViewDoctorPage'
import EditDoctorPage from '../pages/admin/EditDoctorPage'
import AddDoctorPage from '../pages/admin/AddDoctorPage'
import DepartmentListPage from '../pages/admin/DepartmentListPage'
import AddDepartmentPage from '../pages/admin/AddDepartmentPage'
import ListUsersPage from '../pages/admin/ListUsersPage'
import ViewUserPage from '../pages/admin/ViewUserPage'
import { AdminIsLoggedIn, AdminIsLoggedOut } from '../components/common/ProductRoutes'
import Error404 from '../pages/common/Error404'
import EditDepartmentPage from '../pages/admin/EditDepartmentPage'
import ViewDepartmentPage from '../pages/admin/ViewDepartmentPage'
import AddBedPage from '../pages/admin/AddBedPage'
import BedListPage from '../pages/admin/BedListPage'
import AssignPatientPage from '../pages/admin/AssignPatientPage'
import ViewBedPage from '../pages/admin/ViewBedPage'



function AdminRoutes() {
  return (
    <div className='adminLayout'>
      <Routes>

        <Route path='' element={<AdminIsLoggedOut/>}>
          <Route path='/login' element={<AdminLogin/>} />
        </Route>

        <Route path='/' element={<AdminIsLoggedIn/>}>

          <Route path='/' element={<AdminDashboard/>} />
          <Route path='/dashboard' element={<AdminDashboard/>} />

          <Route path='/doctors' element={<ListDoctorsPage/>} />
          <Route path='/doctors/add' element={<AddDoctorPage/>} />
          <Route path='/doctors/view/:_id' element={<ViewDoctorPage/>} />
          <Route path='/doctors/edit/:_id' element={<EditDoctorPage/>} />

          <Route path='/departments' element={<DepartmentListPage/>} />
          <Route path='/departments/add' element={<AddDepartmentPage/>} />
          <Route path='/departments/view/:_id' element={<ViewDepartmentPage/>} />
          <Route path='/departments/edit/:_id' element={<EditDepartmentPage/>} />

          <Route path='/users' element={<ListUsersPage/>} />
          <Route path='/users/view/:_id' element={<ViewUserPage/>} />

          <Route path='/bed' element={<BedListPage/>} />
          <Route path='/bed/add' element={<AddBedPage/>} />
          <Route path='/bed/view/:_id' element={<ViewBedPage/>} />
          <Route path='/bed/assign' element={<AssignPatientPage/>} />

          <Route path='*' element={<Error404/>} />

        </Route>

      </Routes>
    </div>
  )
}

export default AdminRoutes