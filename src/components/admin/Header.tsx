import { useLocation, useNavigate } from "react-router-dom"
import { AdminHeaderNavigation } from "../../types/commonTypes"
import { useDispatch } from "react-redux"
import { logoutAdmin } from "../../store/slice/adminSlice"
import { logoutDoctor } from "../../store/slice/doctorSlice"

function Header({navigation,_id}:AdminHeaderNavigation) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  
  const handleLogout = ()=>{

    if(path.split('/').includes('admin')) dispatch(logoutAdmin())
    else dispatch(logoutDoctor())

  }

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gray-200 neumorphic">
    <div className="flex items-center">
        <img src="/src/assets/images/Mediheal.png" alt="Logo" className="h-8 w-40 mr-2" />
    </div>
    <button className="lg:hidden bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg">
        Menu
    </button>
    <div className="flex">
        <button className="hidden lg:block neumorphic-rounded py-2 px-2 rounded-lg" onClick={handleLogout}>
            <img src="/src/assets/icons/LOGOUT.png" alt="Button Icon" className="h-5 w-5" />
        </button>
        <button className="hidden lg:block neumorphic-rounded py-2 px-2 rounded-lg ml-2" onClick={() => navigate(`${navigation}/${_id}`)}>
            <img src="/src/assets/icons/user.png" alt="Button Icon" className="h-5 w-5" />
        </button>
    </div>
</header>
  )
}

export default Header
