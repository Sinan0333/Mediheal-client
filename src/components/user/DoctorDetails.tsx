import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DoctorData, OneSlotType, initialDoctorData, initialOneSlotsType,} from "../../types/doctorTypes"
import { ResponseData, days } from "../../types/commonTypes"
import SlotsTable from "./SlotsTable"
import AddPatientForm from "./AddPatientForm"
import ExistingPatient from "./ExistingPatient"
import { loadStripe } from '@stripe/stripe-js';
import { bookNowValidation } from "../../validations/user/appointmentValidation"
import { notifyError, notifySuccess } from "../../constants/toast"
import { confirmBooking, createCheckoutSession } from "../../api/user/appointment"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { getDoctorDataApi } from "../../api/user/doctorApi"
import PaymentOptionModal from "./PaymentOptionModal"
import { walletPaymentApi } from "../../api/user/userApi"

function DoctorDetails() {
  const [data,setData] = useState<DoctorData>(initialDoctorData)
  const [selectedSlot,setSelectedSlot] = useState<OneSlotType>(initialOneSlotsType)
  const [selectedPatient,setSelectedPatient] = useState<string>("")
  const [selectedDay,setSelectedDay] = useState<string>("")
  const [imageUrl,setImageUrl] = useState<string>("")
  const [reload,setReload] = useState(false)
  const [isChooseModalOpen,setIsChooseModalOpen] = useState(false)
  const [type,setType] = useState<"Online"|"Offline"| "">("")
  const userId = useSelector((state:RootState)=>state.user._id)
  const navigate = useNavigate()

  const {_id}= useParams()
  let selectedDays: string[] = []
  const currentDate = new Date()
  const currentDayOfWeek = currentDate.getDay()
  
  for (let i = 0; i < data?.workingDays.length; i++) {
    const index = data.workingDays[i];
    if (index >= 0 && index < days.length) {
      selectedDays.push(days[index]);
    }
  }

  useEffect(()=>{
    getDoctorDataApi(_id).then((res)=>{
      setData(res.data)
      setImageUrl(`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/${res.data.image}`)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])

  const stripePayment = async () => {
    try {


      if(!selectedSlot._id) return notifyError("Pleas select the time slot")
      if(!type) return notifyError("Pleas select the payment option")
      const result:string = bookNowValidation({slotId:selectedSlot._id,startTime:selectedSlot.startTime,endTime:selectedSlot.endTime,patient:selectedPatient,day:selectedDay,doctor:"",status:"Pending",type,bookedDate:new Date(),fees:data.fees,userId,chat:false})
      if(result != "Success") return notifyError(result)

      
      const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)
      const response2:ResponseData = await createCheckoutSession(data.fees)
      stripe?.redirectToCheckout({
        sessionId:response2.data
      }) 

      const response3:ResponseData = await confirmBooking(data.slots._id,{slotId:selectedSlot._id,startTime:selectedSlot.startTime,endTime:selectedSlot.endTime,day:selectedDay,status:"Pending",doctor:_id,patient:selectedPatient,type,bookedDate:new Date(),fees:data.fees,userId,chat:false})
      if(!response3.status) notifyError(response3.message)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const walletPayment = async ()=>{

    try {
        if(!selectedSlot._id) return notifyError("Pleas select the time slot")
        if(!type) return notifyError("Pleas select the payment option")
    
        const result:string = bookNowValidation({slotId:selectedSlot._id,startTime:selectedSlot.startTime,endTime:selectedSlot.endTime,patient:selectedPatient,day:selectedDay,doctor:"",status:"Pending",type,bookedDate:new Date(),fees:data.fees,userId,chat:false})
        if(result != "Success") return notifyError(result)
    
        const response:ResponseData = await walletPaymentApi(userId,data.fees)
        if(!response.status) return notifyError(response.message)
    
        const response3:ResponseData = await confirmBooking(data.slots._id,{slotId:selectedSlot._id,startTime:selectedSlot.startTime,endTime:selectedSlot.endTime,day:selectedDay,status:"Pending",doctor:_id,patient:selectedPatient,type,bookedDate:new Date(),fees:data.fees,userId,chat:false})
        if(!response3.status) return notifyError(response3.message)
    
        notifySuccess("Booking Successful")
        navigate('/home')
    } catch (error:any) {
      console.log(error.message);
    }
  }

  
  return (
    <div className="px-1 sm:px-12 md:px-22 lg:px-32">
      {
        isChooseModalOpen ? <PaymentOptionModal isChooseModalOpen={isChooseModalOpen}  setIsChooseModalOpen={setIsChooseModalOpen} stripePayment={stripePayment} walletPayment={walletPayment}/> :""
      }
      <div className="flex justify-center">
        <h1 className="text-4xl  font-semibold text-adminBlue">{data.firstName} {data.secondName}</h1>
      </div>
      <div className="md:flex">
        <div className="mt-8 w- h-98 flex  justify-center overflow-hidden   ">
          <img src={imageUrl} alt="Your Image" className="object-cover" />
        </div>
        <div className="flex-wrap mt-10 ml-10">
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Full Name:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{data.firstName} {data.secondName}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Department:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{data.department.name}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Gender:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{data.gender}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Age:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{data.age}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Experience:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{data.experience} year</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Working Days:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{selectedDays.join(",")}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Working Time:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{data.schedule.startTime} - {data.schedule.endTime}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Fees:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{data.fees}</label>
          </div>
          <div className="mb-5 flex  pr-4">
            <label className="font-bold text-xl mr-4  text-adminBlue">Status:</label>
            <label className="font-bold text-lg w-56 text-adminGreen">{data.workingDays.includes(currentDayOfWeek) ? "Available" : "Unavailable"}</label>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex justify-center">
          <h1 className="font-bold text-3xl text-adminBlue" >Make An Appointment</h1>
        </div>
        <SlotsTable slots={data.slots} state={selectedSlot} setState={setSelectedSlot} selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
        <AddPatientForm state={reload} setState={setReload}/>
        <ExistingPatient state={selectedPatient} setState={setSelectedPatient} reload={reload}/>
      </div>
      <div className="flex justify-center mt-8 mb-8 gap-6">
        <button className="bg-adminBlue w-36 h-8 font-semibold text-white rounded-lg hover:bg-adminGreen" onClick={()=>{{setIsChooseModalOpen(true),setType("Online")}}}>Book For Online</button>
        <button className="bg-adminBlue w-36 h-8 font-semibold text-white rounded-lg hover:bg-adminGreen" onClick={()=>{setIsChooseModalOpen(true),setType("Offline")}}>Book For Offline</button>
      </div>
    </div>
  )
}

export default DoctorDetails

