import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { notifyError, notifySuccess } from "../../constants/toast"
import { ResponseData } from "../../types/commonTypes"
import { getOtp, resendOtp, verifyOtp } from "../../api/doctor/auth"

function DoctorOtpVerification() {
    const [first,setFirst] = useState<string>("")
    const [second,setSecond] = useState<string>("")
    const [third,setThird] = useState<string>("")
    const [fourth,setFourth] = useState<string>("")
    const [otp,setOtp] = useState<string>("")
    const [email,setEmail]=useState("")
    const navigate = useNavigate()
    const{_id} = useParams()
    const location = useLocation()
    const path = location.pathname.split('/')
    const [resendBtn,setResendBtn] = useState<boolean>(false)
    const [seconds, setSeconds] = useState(60);
    
    useEffect(()=>{
        getOtp(_id).then((res)=>{
            setOtp(res.data.otp)            
            setEmail(res.data.email)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

    
    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            setResendBtn(true);
            return prevSeconds; 
          }
        });
      }, 1000);
    
      return () => clearInterval(interval);
    }, [otp]);

    const handleResendOtp = async()=>{
      const response:ResponseData = await resendOtp(_id)
      if(response.status){
        notifySuccess(response.message)
        setOtp(response.data.otp)
        setEmail(response.data.email)
        setSeconds(60)
        setResendBtn(false)
      }else{
        notifyError(response.message)
      }
    }

    const handleSubmit = async( ) =>{
        if(!_id) return notifyError("Something went wrong")
        if(!first || !second || !third || !fourth) return notifyError("Missing required fields")

        const inputOtp = first+second+third+fourth
        if(inputOtp !== otp) return notifyError("incorrect OTP")

        const response = await verifyOtp(_id,inputOtp)
        if(response.status){          
          notifySuccess(response.message)
            if(path.includes('doctor')){
                navigate(`/doctor/change_password/${response.data._id}`)
            }else{
                notifyError("Something went wrong")
            }
        }else{
            notifyError(response.message)
        }
    }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email {email}</p>
        </div>
      </div>

      <div>
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"  maxLength={1} type="text" value={first} onChange={(e)=>setFirst(e.target.value)}/>
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"  maxLength={1} type="text" value={second} onChange={(e)=>setSecond(e.target.value)}/>
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" maxLength={1} type="text"  value={third} onChange={(e)=>setThird(e.target.value)}/>
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" maxLength={1} type="text"  value={fourth} onChange={(e)=>setFourth(e.target.value)}/>
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
              {
                resendBtn ? <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" onClick={handleResendOtp}>Resend Otp</button>
                : <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" onClick={handleSubmit}>Submit</button>
              }
              </div>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium text-gray-400">
                <p>Didn't receive the code? Please wait for a <span className="text-blue-700">{seconds}</span> seconds</p>
              </div>
            </div>

          </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default DoctorOtpVerification
