import {Routes,Route} from 'react-router-dom'
import AddDepartmentForm from "../../components/admin/AddDepartmentForm"
import Header from "../../components/admin/Header"
import Navigation from "../../components/admin/Navigation"

function AdminDashboard() {
  return (
    <>
      <Header navigation='/profile'/>
        <div className="flex mt-6 bg-transparent">
          <Navigation/>
          <Routes>
            <Route path='/add' element={<AddDepartmentForm/>} />
          </Routes>
        </div>
    </>
  )
}

export default AdminDashboard
