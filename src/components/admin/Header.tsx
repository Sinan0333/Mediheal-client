
function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-gray-200 neumorphic">
      <div className="flex items-center">
        <img src="/src/assets/images/Mediheal.png" alt="Logo" className="h-8 w-40 mr-2" />
      </div>
      <button className="lg:hidden bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg">
        Menu
      </button>
      <button className="hidden lg:block neumorphic-rounded  py-2 px-2  rounded-lg">
      <img src="/src/assets/icons/user.png" alt="Button Icon" className="h-5 w-5" />
      </button>
    </header>
  )
}

export default Header
