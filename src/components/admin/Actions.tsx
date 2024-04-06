import { useNavigate } from "react-router-dom"
import { ActionProps } from "../../types/commonTypes"


function Actions({viewNav,editNav,_id,is_blocked,handleBlock}:ActionProps) {
  const navigate = useNavigate()
  return (
    <div className="flex">
      <button className="neumorphic-navBtn  py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(viewNav)}>
        <img src="/src/assets/icons/eye.png" alt="Button Icon"  />
      </button>
      <button className="neumorphic-navBtn  py-2 px-2 ml-1 w-8 h-8 rounded-lg" onClick={()=>navigate(editNav)}>
        <img src="/src/assets/icons/edit.png" alt="Button Icon"  />
      </button>
      <button className={`${is_blocked ? "neumorphic-clicked" : "neumorphic-navBtn"}  py-2 px-2 ml-1 w-8 h-8 rounded-lg`} onClick={() =>handleBlock && handleBlock(!is_blocked,_id)}>
      </button>
    </div>
  )
}

export default Actions
