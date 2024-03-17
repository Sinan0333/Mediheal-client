import {Routes,Route} from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminDoctors from '../pages/admin/AdminDoctors'


function AdminRoutes() {
  return (
    <div className='adminLayout'>
      <Routes>
          <Route path='/' element={<AdminDashboard/>} />
          <Route path='/login' element={<AdminLogin/>} />
          <Route path='/doctors' element={<AdminDoctors/>} />
      </Routes>
    </div>
  )
}

export default AdminRoutes