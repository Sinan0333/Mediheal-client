type UserChatHeaderProps = {
    name:string
    department:string
    image:string
}


function UserChatHeader({name,department,image}:UserChatHeaderProps) {
    const imageUrl = `https://res.cloudinary.com/dw2cscitl/${image}`
  return (
    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
        <div className="flex items-center">
            <div className="w-10 h-10">
                <img className="w-full h-full object-cover rounded-full" src={imageUrl}/>
            </div>
            <div className="ml-4">
                <p className="text-grey-darkest">
                    {name}
                </p>
                <p className="text-grey-darker text-xs mt-1">
                    {department}
                </p>
            </div>
        </div>
    </div>
  )
}

export default UserChatHeader
