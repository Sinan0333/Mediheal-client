import { useNavigate } from "react-router-dom"
import { ActionProps } from "../../types/commonTypes"
import {eye,edit,blockGreen,blockRed} from '../../constants/icons'


function Actions({viewNav,editNav,_id,is_blocked,handleBlock}:ActionProps) {
  const navigate = useNavigate()
  return (
    <div className="flex">
      <button className="neumorphic-navBtn  py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(viewNav)}>
        <img src={eye} alt="Button Icon"  />
      </button>
      <button className="neumorphic-navBtn  py-2 px-2 ml-1 w-8 h-8 rounded-lg" onClick={()=>navigate(editNav)}>
        <img src={edit} alt="Button Icon"  />
      </button>
      <button className={`${is_blocked ? "neumorphic-clicked bg-red-950" : "neumorphic-navBtn"}  py-2 px-2 ml-1 w-8 h-8 rounded-lg`} onClick={() =>handleBlock && handleBlock(!is_blocked,_id)}>
        <img  src={is_blocked ? blockRed : blockGreen} alt="" />
      </button>
    </div>
  )
}

export default Actions
