type UserMessageProps = {
  message:string
  createdAt:string
}
function UserMessage({message,createdAt}:UserMessageProps) {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
            <div  className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                A
            </div>
            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl max-w-60 md:max-w-98 break-words">
                <div>{message}</div>
                <p className="text-gray-600 text-xs">{new Date(createdAt).toLocaleTimeString()}</p>
            </div>
        </div>
    </div>
  )
}

export default UserMessage
