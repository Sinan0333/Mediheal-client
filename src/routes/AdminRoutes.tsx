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

          <Route path='/users' element={<ListUsersPage/>} />
          <Route path='/users/view/:_id' element={<ViewUserPage/>} />
        </Route>

      </Routes>
    </div>
  )
}

export default AdminRoutes