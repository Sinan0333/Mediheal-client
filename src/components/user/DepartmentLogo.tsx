import { DepartmentLogoProps } from "../../types/userTypes"

function DepartmentLogo({data,setState}:DepartmentLogoProps) {

    const imageUrl = `${import.meta.env.VITE_CLOUDINARY_BASE_URL}/${data.logo}`

  return (
    <div className="flex w-1/5 flex-wrap ml-2" onClick={()=>setState(data)}>
      <div className="max-w-20 min-w-10 p-3 md:p-2 bg-white rounded-full">
        <img
          alt="gallery"
          className="block h-full w-full rounded-lg object-cover object-center"
          src={imageUrl} />
      </div>
    </div>
  )
}

export default DepartmentLogo
