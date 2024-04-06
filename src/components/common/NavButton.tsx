import { useNavigate } from "react-router-dom"

type NavButtonProps = {
  icon:string
  name:string
  navigation:string
}

function NavButton({icon,name,navigation}:NavButtonProps) {
  const navigate = useNavigate()
  return (
    <div className="neumorphic-navBtn flex items-center py-2 px-2 rounded-lg cursor-pointer" onClick={()=>navigate(`/admin${navigation}`)}>
      <img src={icon} className="h-6 mr-2" alt="Logo" />
      <span className="text-adminBlue font-bold ">{name}</span>
    </div>
  )
}

export default NavButton
