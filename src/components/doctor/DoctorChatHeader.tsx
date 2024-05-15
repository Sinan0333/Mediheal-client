import { end, video } from "../../constants/icons"

type DoctorChatHeaderProps = {
    name:string
    image?:string | File
    id:string 
    endSession:() => void
    handleCall:() => void
}

function DoctorChatHeader({image,name,id,endSession,handleCall}:DoctorChatHeaderProps) {
    const imageUrl = `https://res.cloudinary.com/dw2cscitl/${image}`
    const defaultProfile:string = '/src/assets/images/default_profile.jpg'
  return (
    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center ">
        <div className="flex items-center">
            <div className="w-10 h-10">
                <img className="w-full h-full object-cover rounded-full" src={image ? imageUrl : defaultProfile}/>
            </div>
            <div className="ml-4">
                <p className="text-grey-darkest">
                    {name}
                </p>
                <p className="text-grey-darker text-xs mt-1">
                    {id}
                </p>
            </div>
        </div>

        <div className="flex">
            <div className="w-6 h-6 cursor-pointer" onClick={handleCall}>
                <img src={video} alt="" />
            </div>
            <div className="w-6 h-6 cursor-pointer ml-6" onClick={endSession}>
                <img src={end} alt="" />
            </div>
            <div className="ml-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
            </div>
        </div>
    </div>
  )
}

export default DoctorChatHeader
