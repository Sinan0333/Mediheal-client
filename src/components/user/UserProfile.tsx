import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function UserProfile() {

    const userData = useSelector((state:RootState)=>state.user)
    const userImage = userData.image ? `https://res.cloudinary.com/dw2cscitl/${userData.image}` : '/src/assets/images/default_profile.jpg'

  return (

    <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg py-3 p-6">
            <div className="photo-wrapper p-2">
                <img className="w-32 h-32 rounded-full mx-auto" src={userImage} alt="John Doe" />
            </div>
            <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{userData.name}</h3>
                <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>{userData.name}</p>
                </div>
                <table className="text-xs my-3">
                    <tbody>
                    <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                        <td className="px-2 py-2">{userData.phone}</td>
                    </tr>
                    <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                        <td className="px-2 py-2">{userData.email}</td>
                    </tr>
                </tbody></table>
    
                {/* <div className="text-center my-3">
                    <a className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">Edit Profile</a>
                </div> */}
    
            </div>
        </div>
    </div>
    
  )
}

export default UserProfile
