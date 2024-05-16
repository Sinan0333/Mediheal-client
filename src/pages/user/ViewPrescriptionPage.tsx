import { useNavigate, useParams } from "react-router-dom"
import Nav from "../../components/user/Nav"
import ViewPrescriptions from "../../components/user/ViewPrescriptions"
import { useEffect, useState } from "react"
import { PrescriptionPopulateData } from "../../types/doctorTypes"
import { getPatientPrescriptions } from "../../api/user/patient"

function ViewPrescriptionPage() {
    const [prescriptions,setPrescriptions] = useState<PrescriptionPopulateData[]>([])
    const navigate = useNavigate()
    const {_id}  = useParams()

    useEffect(()=>{
        getPatientPrescriptions(_id as string).then((res)=>{
            setPrescriptions(res.data)
        })
    },[])

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
          <div className="p-2 md:p-4">
            {/* <div className="flex justify-center">
                <h1 className="font-bold text-3xl">{prescriptions[0].patient.firstName} {prescriptions[0].patient.secondName}</h1>
            </div> */}
            {
                prescriptions.map((prescription,i)=>{
                    return <ViewPrescriptions key={i} prescription={prescription}/>
                })
            }
          </div>
      </main>
    </div>
  </>
  )
}

export default ViewPrescriptionPage
