import { DepartmentDetailedProps } from "../../types/userTypes"

function DepartmentDetailed({data}:DepartmentDetailedProps) {

  const imageUrl = `https://res.cloudinary.com/dw2cscitl/${data?.image}`
  const logoUrl =  `https://res.cloudinary.com/dw2cscitl/${data?.logo}`

  return (
  <div className="max-w-sm w-full h-72 lg:max-w-full lg:flex mb-20">
    <div className="h-96 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${imageUrl})`}}title="Woman holding a mug"></div>
    <div className="border-r border-b border-l  border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-adminBlue rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <div className=" font-bold text-xl text-white mb-2">{data?.title}</div>
        <p className="text-base text-white">{data?.description}</p>
      </div>
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full mr-4" src={logoUrl} alt="Avatar of Jonathan Reinink"/>
        {/* <div className="text-sm">
          <p className="text-gray-900 leading-none">Jonathan Reinink</p>
          <p className="text-gray-600">Aug 18</p>
        </div> */}
      </div>
    </div>
  </div>

  )
}

export default DepartmentDetailed
