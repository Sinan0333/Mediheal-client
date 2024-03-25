import NavButton from "../common/NavButton"
import { dashboard,doctor,department } from "../../constants/icons"

function DoctorNavigationBar() {
  return (
    <div className="neumorphic  w-64 h-screen py-2 px-2 flex flex-col justify-between">
      <div className="p-2">
        <h1 className="text-xl font-bold text-adminBlue">Navigation</h1>
        <ul className="mt-4 ">
          <li className="mb-4">
            <NavButton icon={dashboard} name="Dashboard" navigation=""/>
          </li>
          <li className="mb-4">
          <NavButton icon={doctor} name="Doctors" navigation="/doctors"/>
          </li>
          <li className="mb-4">
          <NavButton icon={department} name="Patients" navigation="/patients"/>
          </li>
          <li className="mb-4">
          <NavButton icon={department} name="Department" navigation="/departments"/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DoctorNavigationBar
