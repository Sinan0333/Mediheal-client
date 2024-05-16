import { useNavigate } from "react-router-dom"
import Nav from "../../components/user/Nav"
import LIstUserPatients from "../../components/user/LIstUserPatients"

function PatientsPage() {
    const navigate = useNavigate()
  return (
    <>
      <Nav/>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">

                <h2 className="pl-3 mb-4 text-2xl font-semibold">Account</h2>

                <p  className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full cursor-pointer" onClick={() => navigate('/account/profile')}>
                    Profile
                </p>
                <p 
                    className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full cursor-pointer" onClick={() => navigate('/account/booking_history')}>
                    Booking History
                </p>
                <p 
                    className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full cursor-pointer" >
                    Patients
                </p>
                <p 
                    className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full cursor-pointer" onClick={() => navigate('/account/wallet')}>
                    Wallet
                </p>
            </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 mt-14 md:p-4">
                <LIstUserPatients/>
            </div>
        </main>
      </div>
    </>
  )
}

export default PatientsPage
