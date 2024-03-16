import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/user/UserSignup'
import UserLogin from '../pages/user/UserLogin.tsx'
import Sample from '../components/common/Sample.tsx'

function UserRoutes() {
  return (
    <div className='adminLayout'>
      <Routes>
          <Route path='/sample' element={<Sample/>} />
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/login' element={<UserLogin/>} />
      </Routes>
    </div>
  )
}

export default UserRoutes