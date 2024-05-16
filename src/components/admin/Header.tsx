import { useLocation, useNavigate } from "react-router-dom"
import { AdminHeaderNavigation } from "../../types/commonTypes"
import { useDispatch } from "react-redux"
import { logoutAdmin } from "../../store/slice/adminSlice"
import { logoutDoctor } from "../../store/slice/doctorSlice"

function Header({navigation,_id,isNavigationOpen,setIsNavigationOpen}:AdminHeaderNavigation) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  
  const handleLogout = ()=>{

    if(path.split('/').includes('admin')){
      dispatch(logoutAdmin())
      localStorage.removeItem("adminToken")
    } else{
      dispatch(logoutDoctor())
      localStorage.removeItem('doctorToken')
    } 
  }

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gray-200 neumorphic lg:ml-64">
    <div className="flex items-center">
        <img src="/src/assets/images/Mediheal.png" alt="Logo" className="h-8 w-40 mr-2" />
    </div>
    <div className="flex">
      <button className="neumorphic-rounded py-2 px-2 rounded-lg" onClick={handleLogout}>
          <img src="/src/assets/icons/LOGOUT.png" alt="Button Icon" className="h-5 w-5" />
      </button>
      <button className="neumorphic-rounded py-2 px-2 rounded-lg ml-2" onClick={() => navigate(`${navigation}/${_id}`)}>
          <img src="/src/assets/icons/user.png" alt="Button Icon" className="h-5 w-5" />
      </button>
      <button className="neumorphic-rounded lg:hidden ml-2  text-gray-700 font-semibold py-2 px-2 " onClick={()=>setIsNavigationOpen(!isNavigationOpen)}>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
    </div>
</header>
  )
}

export default Header
