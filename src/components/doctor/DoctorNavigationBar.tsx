import NavButton from "../common/NavButton"
import { dashboard,patient,appointment,schedule } from "../../constants/icons"

type DoctorNavigationBarProps = {
  isNavigationOpen: boolean
}

function DoctorNavigationBar({isNavigationOpen}:DoctorNavigationBarProps) {
  return (
    <div className={`neumorphic py-2 px-2 fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full ${isNavigationOpen ? "translate-x-0" : ""} lg:translate-x-0`}>
      <div className="p-2">
        <h1 className="text-xl font-bold text-adminBlue">Navigation</h1>
        <ul className="mt-4 ">
          <li className="mb-4">
            <NavButton icon={dashboard} name="Dashboard" navigation="/doctor/dashboard"/>
          </li>
          <li className="mb-4">
            <NavButton icon={patient} name="Patients" navigation="/doctor/patients"/>
          </li>
          <li className="mb-4">
            <NavButton icon={appointment} name="Appointments" navigation="/doctor/appointments"/>
          </li>
          <li className="mb-4">
            <NavButton icon={schedule} name="Schedule" navigation="/doctor/schedule"/>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DoctorNavigationBar
