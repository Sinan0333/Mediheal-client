import {Route,Routes} from 'react-router-dom'
import UserSignup from '../pages/user/UserSignup'
import UserLogin from '../pages/user/UserLogin.tsx'

function UserRoutes() {
  return (
      <Routes>
          <Route path='/signup' element={<UserSignup/>} />
          <Route path='/login' element={<UserLogin/>} />
      </Routes>

  )
}

export default UserRoutes