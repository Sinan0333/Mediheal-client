import {Routes,Route} from 'react-router-dom'
import AddDoctorForm from "../../components/doctor/AddDoctorForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/common/Navigation"
import ListDoctors from '../../components/doctor/ListDoctors'
import ViewDoctor from '../../components/doctor/ViewDoctor'

function AdminDoctors() {
  return (
    <>
    <Header/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <Routes>
          <Route path='/' element={<ListDoctors/>} />
          <Route path='/add' element={<AddDoctorForm/>} />
          <Route path='/view/:_id' element={<ViewDoctor/>} />
        </Routes>
        
      </div>
  </>
  )
}

export default AdminDoctors
