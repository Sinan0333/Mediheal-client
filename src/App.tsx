import {Route , Routes} from 'react-router-dom'
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import DoctorRoutes from './routes/DoctorRoutes';
import CloudinaryProvider from './store/context/cloudinaryContext';

const App = () => {
  return (
    <>
      <CloudinaryProvider>
        <Routes>
          <Route path='/*'element={<UserRoutes/>} />
          <Route path='/admin/*' element={<AdminRoutes/>} />
          <Route path='/doctor/*' element={<DoctorRoutes/>}/>
        </Routes>
      </CloudinaryProvider>
    </>
  );
}

export default App;
