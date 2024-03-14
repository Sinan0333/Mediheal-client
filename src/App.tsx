import {Route , Routes} from 'react-router-dom'
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import DoctorRoutes from './routes/DoctorRoutes';

const App = () => {
  return (
    <Routes>
      <Route path='/*'element={<UserRoutes/>} />
      <Route path='/admin' element={<AdminRoutes/>} />
      <Route path='/doctor' element={<DoctorRoutes/>}/>
    </Routes>
  );
}

export default App;
