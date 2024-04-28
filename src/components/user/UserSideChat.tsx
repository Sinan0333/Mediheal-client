import io from 'socket.io-client';
import DoctorResponse from "./DoctorResponse"
import UserChatInput from "./UserChatInput"
import UserMessage from "./UserMessage"
import { useEffect, useState } from 'react';
import { MessageType } from '../../types/commonTypes';
import { useParams } from 'react-router-dom';
import { notifyError } from '../../constants/toast';
import { createMessage, getChatData } from '../../api/user/userChat';
import UserChatHeader from './UserChatHeader';
import { DoctorData, initialDoctorData } from '../../types/doctorTypes';
import { getDoctorDataApi } from '../../api/user/doctorApi';

const socket = io('http://localhost:3000');
    
function UserSideChat() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [messageText, setMessageText] = useState('');
    const [doctorData,setDoctorData] = useState<DoctorData>(initialDoctorData)
    const {chatId,patId} = useParams()

    useEffect(()=>{
        if(!chatId || !patId)return notifyError("something wrong pleas try again later") 
        socket.emit('add_user',patId);
        getChatData({sender:patId,receiver:chatId}).then((res)=>{
            setMessages(res.data)
        })
        getDoctorDataApi(chatId).then((res)=>{
            setDoctorData(res.data)
        })
    },[])


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, {sender: message.sender,receiver:message.receiver, text: message.text}]);
        });
      }, [messages]);
    
      const sendMessage = async() => {
        if(!chatId || !patId) return notifyError("Something wrong please try again later") 
        socket.emit('sendMessage', {sender:patId,receiver:chatId ,text: messageText });
        await createMessage({sender:patId,receiver:chatId,text:messageText})
        setMessageText('');
      };
      
  return (
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-6">
                <UserChatHeader name={doctorData.firstName + doctorData.secondName} department={doctorData.department.name} image={doctorData.image}/>
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                            <div className="grid grid-cols-12 gap-y-2">
                                {
                                    messages.map((message,i) => (
                                        message.sender=== patId ? <UserMessage key={i} message={message.text}/> : <DoctorResponse key={i} message={message.text}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <UserChatInput message={messageText} setMessage={setMessageText} sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserSideChat
