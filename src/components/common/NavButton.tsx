import { useLocation, useNavigate } from "react-router-dom"

type NavButtonProps = {
  icon:string
  name:string
  navigation:string
}

function NavButton({icon,name,navigation}:NavButtonProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname
  
  return (
    <div className={`${pathName === navigation ? 'neumorphic-navBtn-clicked' : "neumorphic-navBtn"} flex items-center py-2 px-2 rounded-lg cursor-pointer `}onClick={()=>navigate(`${navigation}`)}>
      <img src={icon} className="h-6 mr-2" alt="Logo" />
      <span className="text-adminBlue font-bold ">{name}</span>
    </div>
  )
}

export default NavButton
