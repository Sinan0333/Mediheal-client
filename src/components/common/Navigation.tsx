import NavButton from "./NavButton"
import { dashboard,doctor } from "../../constants/icons"


function Navigation() {
  return (
    <div className="neumorphic  w-64 h-screen py-2 px-2 flex flex-col justify-between">
      <div className="p-2">
        <h1 className="text-xl font-bold text-adminBlue">Navigation</h1>
        <ul className="mt-4 ">
          <li className="mb-4">
            <NavButton icon={dashboard} name="Dashboard"/>
          </li>
          <li className="mb-4">
          <NavButton icon={doctor} name="Doctors"/>
          </li>
          <li className="mb-4">
          <NavButton icon={dashboard} name="Patients"/>
          </li>
          <li className="mb-4">
          <NavButton icon={dashboard} name="Department"/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation
