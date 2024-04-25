import DoctorChatInput from "./DoctorChatInput"
import DoctorMessage from "./DoctorMessage"
import UserResponse from "./UserResponse"

function DoctorSideChat() {
  return (
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                            <div className="grid grid-cols-12 gap-y-2">
                                <UserResponse/>
                                <DoctorMessage/>
                            </div>
                        </div>
                    </div>
                    <DoctorChatInput/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorSideChat
