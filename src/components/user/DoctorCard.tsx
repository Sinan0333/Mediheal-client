import { DoctorCardProps } from "../../types/doctorTypes";



function DoctorCard({firstName,secondName,department,image,experience,age,gender}:DoctorCardProps) {

  const imageUrl = `https://res.cloudinary.com/dw2cscitl/${image}`;

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72 ml-2 mb-6">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-72">
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
            $95.00
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 ">
          <span className="text-adminGold font-bold">Department: </span>{department.name}
        </p>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 ">
        <span className="text-adminGold font-bold">Experience: </span>{experience} year
        </p>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 ">
        <span className="text-adminGold font-bold">Age: </span>{age} 
        </p>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 ">
        <span className="text-adminGold font-bold">Gender: </span>{gender} 
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          type="button">
          Book Now
        </button>
      </div>
    </div>
  )
}

export default DoctorCard
