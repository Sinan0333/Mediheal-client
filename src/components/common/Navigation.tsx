import NavButton from "./NavButton"


function Navigation() {
  return (
    <div className="neumorphic mt-4 w-64 h-screen py-2 px-2 flex flex-col justify-between">
      <div className="p-2 ">
        {/* <h1 className="text-xl font-bold">Logo</h1> */}
        <ul className="mt-4 ">
          <li className="mb-4">
            <NavButton/>
          </li>
          <li className="mb-4">
          <NavButton/>
          </li>
          <li className="mb-4">
          <NavButton/>
          </li>
          <li className="mb-4">
          <NavButton/>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <button className="neumorphic-rounded text-black py-2 px-4 rounded-lg">
          Button
        </button>
      </div>
    </div>
  )
}

export default Navigation
