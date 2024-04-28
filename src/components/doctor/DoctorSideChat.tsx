import  { useState, useEffect } from 'react';
import io from 'socket.io-client';
import DoctorChatInput from "./DoctorChatInput"
import DoctorMessage from "./DoctorMessage"
import UserResponse from "./UserResponse"
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';
import { createMessage, getChatData } from '../../api/doctor/doctorChat';
import { notifyError } from '../../constants/toast';
import { MessageType } from '../../types/commonTypes';
import DoctorChatHeader from './DoctorChatHeader';
import { getPatientApi } from '../../api/doctor/doctorPatient';
import { PatientData } from '../../types/userTypes';

const socket = io('http://localhost:3000');


function DoctorSideChat() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [messageText, setMessageText] = useState('');
    const [patientData ,setPatientData] = useState<PatientData>({} as PatientData)  
    const doctorId = useSelector((state:RootState)=>state.doctor._id)
    const {_id} = useParams()

    useEffect(()=>{
        if(!_id)return notifyError("something wrong pleas try again later") 
        socket.emit('add_user',doctorId);
        socket.emit('add_user',_id);
        getChatData({sender:doctorId,receiver:_id}).then((res)=>{
            setMessages(res.data)
        }).catch((err)=>console.log(err))
        getPatientApi(_id).then((res)=>{
            setPatientData(res.data)
        }).catch((err)=>console.log(err))
    },[])

    useEffect(() => {
        socket.on('message', (message) => {
          setMessages([...messages, {sender: message.sender,receiver:message.receiver, text: message.text}]);
        });
      }, [messages]);
    
      const sendMessage =async () => {
        if(!_id) return notifyError("Something wrong please try again later") 
        socket.emit('sendMessage', {sender:doctorId,receiver:_id, text: messageText });
        await createMessage({sender:doctorId,receiver:_id, text: messageText })
        setMessageText('');
      };

  return (
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-6">
            <DoctorChatHeader image={patientData.image} name={patientData.firstName + patientData.secondName}/>
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                            <div className="grid grid-cols-12 gap-y-2">
                                {
                                    messages.map((message, i) => (
                                        message.sender === doctorId ? <DoctorMessage key={i} message={message.text}/> : <UserResponse key={i} message={message.text}/>
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
