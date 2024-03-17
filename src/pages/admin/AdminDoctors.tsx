import {Routes,Route} from 'react-router-dom'
import AddDoctorForm from "../../components/admin/AddDoctorForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/common/Navigation"

function AdminDoctors() {
  return (
    <>
    <Header/>
      <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <Routes>
            <Route path='/add' element={<AddDoctorForm/>} />
        </Routes>
        
      </div>
  </>
  )
}

export default AdminDoctors
