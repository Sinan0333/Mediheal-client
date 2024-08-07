type UserResponseProps = {
  message: string
  createdAt:string
} 
function UserResponse({message,createdAt}:UserResponseProps) {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                A
            </div>
            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl max-w-60 md:max-w-98 break-words">
                <div>{message}</div>
                <p className="text-gray-600 text-xs">{new Date(createdAt).toLocaleTimeString()}</p>
            </div>
        </div>
    </div>
  )
}

export default UserResponse
