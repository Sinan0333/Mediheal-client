import {Routes,Route} from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLogin/>} />
    </Routes>
  )
}

export default AdminRoutes