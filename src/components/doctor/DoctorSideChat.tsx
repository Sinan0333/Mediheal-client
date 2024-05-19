import  { useState, useEffect } from 'react';
import DoctorChatInput from "./DoctorChatInput"
import DoctorMessage from "./DoctorMessage"
import UserResponse from "./UserResponse"
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { createMessage, getChatData } from '../../api/doctor/doctorChat';
import { notifyError } from '../../constants/toast';
import { MessageType } from '../../types/commonTypes';
import DoctorChatHeader from './DoctorChatHeader';
import { getPatientApi } from '../../api/doctor/doctorPatient';
import { PatientData } from '../../types/userTypes';
import { useSocket } from '../../store/context/socketContext';
import { Socket } from 'socket.io-client';

function DoctorSideChat() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [messageText, setMessageText] = useState('');
    const [patientData ,setPatientData] = useState<PatientData>({} as PatientData)  
    const doctorId = useSelector((state:RootState)=>state.doctor._id)
    const {patId,userId} = useParams()
    const navigate = useNavigate()
    const socket:Socket = useSocket()

    useEffect(()=>{

        if(!patId)return notifyError("something wrong pleas try again later") 
        socket.emit('add_user',doctorId);

        getChatData({sender:doctorId,receiver:patId}).then((res)=>{
            setMessages(res.data)
        }).catch((err)=>console.log(err))

        getPatientApi(patId).then((res)=>{
            setPatientData(res.data)
        }).catch((err)=>console.log(err))

    },[])

    useEffect(() => {
        socket.on('message', (message:MessageType) => {
          setMessages([...messages, {sender: message.sender,receiver:message.receiver, text: message.text,createdAt:message.createdAt }]);
        });
    }, [messages]);
    
    const sendMessage =async () => {
        
        if(!patId) return notifyError("Something wrong please try again later") 
        
        const time:string = new Date().toISOString();
        socket.emit('sendMessage', {sender:doctorId,receiver:patId, text: messageText,createdAt:time });

        await createMessage({sender:doctorId,receiver:patId, text: messageText,createdAt:time })
        setMessageText('');
    };

    const endSession = async() => {

        if( !patId) return notifyError("Something wrong please try again later")
        socket.emit('end_session',patId)
        navigate(-1)
    }

    const handleCall = async() => {
        socket.emit("call:start",{sender:doctorId,receiver:userId})
        navigate(`/doctor/vide_call/${doctorId}/${userId}`)
    }

  return (
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-2">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-2">
                    <DoctorChatHeader image={patientData.image} name={patientData.firstName + patientData.secondName || ""} id={patientData.id || ""} endSession={endSession} handleCall={handleCall}/>
                    <div className="hide_scrollbar flex flex-col h-full overflow-x-auto ">
                        <div className="flex flex-col h-full">
                            <div className="grid grid-cols-12 gap-y-2">
                                {
                                    messages.map((message, i) => (
                                        message.sender === doctorId ? <DoctorMessage key={i} message={message.text} createdAt={message.createdAt}/> : <UserResponse key={i} message={message.text} createdAt={message.createdAt}/>
                                    ))
                                }
                                
                            </div>
                        </div>
                    </div>
                    <DoctorChatInput message={messageText} setMessage={setMessageText} sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorSideChat
