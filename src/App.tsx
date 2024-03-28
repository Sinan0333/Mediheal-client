import {Route , Routes} from 'react-router-dom'
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import DoctorRoutes from './routes/DoctorRoutes';
import CloudinaryProvider from './store/context/cloudinaryContext';
import Error404 from './pages/common/Error404';

const App = () => {
  return (
    <>
      <CloudinaryProvider>
        <Routes>
          <Route path='/*'element={<UserRoutes/>} />
          <Route path='/admin/*' element={<AdminRoutes/>} />
          <Route path='/doctor/*' element={<DoctorRoutes/>}/>
          <Route path='/error' element={<Error404/>}/>
        </Routes>
      </CloudinaryProvider>
    </>
  );
}

export default App;
