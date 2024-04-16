import NavButton from "../common/NavButton"
import { dashboard,doctor,department,users,bed, patient } from "../../constants/icons"


function Navigation() {
  return (
    <div className="neumorphic  w-64 h-screen py-2 px-2 flex flex-col justify-between">
      <div className="p-2">
        <h1 className="text-xl font-bold text-adminBlue">Navigation</h1>
        <ul className="mt-4 ">
          <li className="mb-4">
            <NavButton icon={dashboard} name="Dashboard" navigation=""/>
          </li>
          <li className="mb-4">
          <NavButton icon={doctor} name="Doctors" navigation="/admin/doctors"/>
          </li>
          <li className="mb-4">
          <NavButton icon={users} name="Users" navigation="/admin/users"/>
          </li>
          <li className="mb-4">
          <NavButton icon={department} name="Department" navigation="/admin/departments"/>
          </li>
          <li className="mb-4">
          <NavButton icon={bed} name="Bed Space" navigation="/admin/bed"/>
          </li>
          <li className="mb-4">
          <NavButton icon={patient} name="Patients" navigation="/admin/patient"/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation
