import  { Socket } from 'socket.io-client';
import DoctorResponse from "../../components/user/DoctorResponse"
import UserChatInput from "../../components/user/UserChatInput"
import UserMessage from "../../components/user/UserMessage"
import { useEffect, useState } from 'react';
import { MessageType } from '../../types/commonTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { notifyError } from '../../constants/toast';
import { createMessage, getChatData } from '../../api/user/userChat';
import UserChatHeader from '../../components/user/UserChatHeader';
import { DoctorData, initialDoctorData } from '../../types/doctorTypes';
import { getDoctorDataApi } from '../../api/user/doctorApi';
import { useSocket } from '../../store/context/socketContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
    
function UserSideChat() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [messageText, setMessageText] = useState('');
    const [doctorData,setDoctorData] = useState<DoctorData>(initialDoctorData)
    const userId = useSelector((state:RootState)=>state.user._id)
    const {chatId,patId} = useParams()
    const navigate = useNavigate()
    const socket:Socket = useSocket()


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

        socket.on('message', (message:MessageType) => {
            setMessages([...messages, {sender: message.sender,receiver:message.receiver, text: message.text}]);
        });

        socket.on("exit_from_chat",()=>[
            navigate(-1)
        ])

        socket.on("call:start",()=>{
            navigate(`/call/${userId}`)
        })

        return () => {
            socket.off('message');
            socket.off("exit_from_chat")
            socket.off("call:start")
        }
      }, [messages,socket,navigate]);
    
      const sendMessage = async() => {

        if(!chatId || !patId) return notifyError("Something wrong please try again later") 
        socket.emit('sendMessage', {sender:patId,receiver:chatId ,text: messageText });

        await createMessage({sender:patId,receiver:chatId,text:messageText})
        setMessageText('');

      };
      
  return (
    <div className="flex h-screen antialiased text-gray-800 ">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-2 ">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-2">
                    <UserChatHeader name={doctorData.firstName + doctorData.secondName} department={doctorData.department.name} image={doctorData.image}/>
                    <div className="hide_scrollbar flex flex-col h-full overflow-x-auto mb-4">
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
