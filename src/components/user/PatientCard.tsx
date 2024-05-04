import { PatientCardProps } from "../../types/userTypes";
import { document, edit, schedule } from "../../constants/icons";
import { useNavigate } from "react-router-dom";
function PatientCard({_id,firstName,secondName,image,dob,age,gender}:PatientCardProps) {
    const navigate = useNavigate()
    const imageUrl =image ? `https://res.cloudinary.com/dw2cscitl/${image}`: "/src/assets/images/default_patient.png"
  
    return (
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72 ml-2 mb-6">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
          <img
            src={imageUrl}
            alt="card-image" className="object-cover w-full h-full" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="block font-sans font-semibold text-base antialiased  leading-relaxed text-blue-gray-900">
              {firstName+secondName}
            </p>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            Age:{age}
            </p>
          </div>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 ">
            <span className="text-adminGold font-bold">Dob: </span>{new Date(dob).toLocaleDateString()}
          </p>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 ">
          <span className="text-adminGold font-bold">Gender: </span>{gender} year
          </p>
        </div>
        <div className="p-6 pt-0 flex justify-center">
          <img className="h-5 mr-2 cursor-pointer" src={edit}  alt="" onClick={()=>navigate(`/account/patients/edit/${_id}`)}/>
          <img className="h-5 mr-2 cursor-pointer" src={document}  alt="" onClick={()=>navigate(`/account/prescription/${_id}`)}/>
          <img className="h-5 mr-2 cursor-pointer" src={schedule}  alt="" />
        </div>
      </div>
    )
}

export default PatientCard
