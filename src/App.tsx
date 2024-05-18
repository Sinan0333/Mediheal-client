import  { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import CloudinaryProvider from './store/context/cloudinaryContext';
import ErrorPage from './pages/common/ErrorPage';
import UserSideLoading from './components/user/UserSideLoading';

const UserRoutes = lazy(() => import('./routes/UserRoutes'));
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
const DoctorRoutes = lazy(() => import('./routes/DoctorRoutes'));

const App = () => {
  return (
    <>
      <CloudinaryProvider>
        <Suspense fallback={<UserSideLoading/>}>
          <Routes>
            <Route path='/*' element={<UserRoutes />} />
            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='/doctor/*' element={<DoctorRoutes />} />
            <Route path='/error/:code' element={<ErrorPage/>} />
          </Routes>
        </Suspense>
      </CloudinaryProvider>
    </>
  );
}

export default App;
