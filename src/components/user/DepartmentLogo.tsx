import { DepartmentLogoProps } from "../../types/userTypes"

function DepartmentLogo({data,setState}:DepartmentLogoProps) {

    const imageUrl = `https://res.cloudinary.com/dw2cscitl/${data.logo}`

  return (
    <div className="flex w-1/5 flex-wrap" onClick={()=>setState(data)}>
      <div className=" max-w-40  p-1 md:p-2">
        <img
          alt="gallery"
          className="block h-full w-full rounded-lg object-cover object-center"
          src={imageUrl} />
      </div>
    </div>
  )
}

export default DepartmentLogo
