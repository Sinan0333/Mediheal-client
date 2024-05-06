import NavButton from "../common/NavButton"
import { dashboard,patient,appointment,schedule } from "../../constants/icons"

function DoctorNavigationBar() {
  return (
    <div className="neumorphic  w-64 min-h-screen py-2 px-2 flex flex-col justify-between">
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
