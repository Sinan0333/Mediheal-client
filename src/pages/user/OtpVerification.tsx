import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { notifyError, notifySuccess } from "../../constants/toast"
import { getOtp, verifyOtp } from "../../api/user/auth"
import { useDispatch } from "react-redux"
import { setUserDetails } from "../../store/slice/userSlice"

function OtpVerification() {

    const [first,setFirst] = useState<string>("")
    const [second,setSecond] = useState<string>("")
    const [third,setThird] = useState<string>("")
    const [fourth,setFourth] = useState<string>("")
    const [otp,setOtp] = useState<string>("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{_id} = useParams()

    useEffect(()=>{
        getOtp(_id).then((res)=>{
            setOtp(res.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

    const handleSubmit = async( ) =>{
        if(!first || !second || !third || !fourth) return notifyError("Missing required fields")

        const inputOtp = first+second+third+fourth
        if(inputOtp !== otp) return notifyError("incorrect OTP")

        const response = await verifyOtp(_id,inputOtp)
        if(response.status){
            dispatch(setUserDetails({
                _id:response.userData?._id,
                name:response.userData?.name,
                phone:response.userData?.phone,
                email:response.userData?.email
            }))
            notifySuccess(response.message)
            navigate('/login')
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
          <p>We have sent a code to your email ba**@dipainhouse.com</p>
        </div>
      </div>

      <div>
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" value={first} onChange={(e)=>setFirst(e.target.value)}/>
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" value={second} onChange={(e)=>setSecond(e.target.value)}/>
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number"  value={third} onChange={(e)=>setThird(e.target.value)}/>
              </div>
              <div className="w-16 h-16 ">
                <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number"  value={fourth} onChange={(e)=>setFourth(e.target.value)}/>
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm" onClick={handleSubmit}>
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default OtpVerification
