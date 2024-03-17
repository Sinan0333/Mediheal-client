import {Routes,Route} from 'react-router-dom'
import AddDepartmentForm from '../../components/admin/AddDepartmentForm'
import Header from '../../components/admin/Header'
import Navigation from '../../components/common/Navigation'

function AdminDepartment() {
  return (
    <>
    <Header/>
    <div className="flex mt-6 bg-transparent">
        <Navigation/>
        <Routes>
            <Route path='/add' element={<AddDepartmentForm/>} />
        </Routes>
    </div>
    </>
  )
}

export default AdminDepartment
