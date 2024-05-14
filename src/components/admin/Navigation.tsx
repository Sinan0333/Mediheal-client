import NavButton from "../common/NavButton"
import { dashboard,doctor,department,users,bed, patient,history } from "../../constants/icons"

type NavigationProps = {
  isNavigationOpen: boolean
}

function Navigation({isNavigationOpen}:NavigationProps) {
  return (
    <div className={`neumorphic py-2 px-2 fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full ${isNavigationOpen ? "translate-x-0" : ""} lg:translate-x-0`}>
      <div className="p-2">
        <h1 className="text-xl font-bold text-adminBlue">Navigation</h1>
        <ul className="mt-4 ">
          <li className="mb-4">
            <NavButton icon={dashboard} name="Dashboard" navigation="/admin/dashboard"/>
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
            <NavButton icon={bed} name="Bed Space" navigation="/admin/bed" />
          </li>
          <li className="mb-4">
            <NavButton icon={history} name="Admit History" navigation="/admin/admit_history"/>
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
