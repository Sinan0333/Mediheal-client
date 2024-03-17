type NavButtonPorps = {
  icon:string
  name:string
}

function NavButton({icon,name}:NavButtonPorps) {
  return (
    <div className="neumorphic-navBtn flex items-center py-2 px-2 rounded-lg">
    <img src={icon} className="h-6 mr-2" alt="Logo" />
    <span className="text-black">{name}</span>
  </div>
  )
}

export default NavButton
