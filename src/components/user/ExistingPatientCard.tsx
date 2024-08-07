import { ExistingPatientCardProps } from "../../types/userTypes"

function ExistingPatientCard({data,state,setState}:ExistingPatientCardProps) {

    const imageUrl = `${import.meta.env.VITE_CLOUDINARY_BASE_URL}/${data.image}`;

  return (
    <div className={`${state == data._id ? "bg-slate-200" : "bg-white"} flex flex-col mb-6 mr-4  items-center  border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`} onClick={()=>setState(data._id)}>
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={data.image ? imageUrl : '/assets/images/default_patient.png'} alt="" />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{data.firstName} {data.secondName}</h5>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Age:{data.age}</p>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Date Of Birth:{new Date(data.dob).toLocaleDateString()}</p>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Blood Group:{data.bloodGroup}</p>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Gender:{data.gender}</p>
        </div>
    </div>
  )
}

export default ExistingPatientCard
