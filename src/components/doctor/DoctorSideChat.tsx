import  { useState, useEffect } from 'react';
import DoctorChatInput from "./DoctorChatInput"
import DoctorMessage from "./DoctorMessage"
import UserResponse from "./UserResponse"
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { createMessage, getChatData } from '../../api/doctor/doctorChat';
import { notifyError } from '../../constants/toast';
import { MessageType, ResponseData } from '../../types/commonTypes';
import DoctorChatHeader from './DoctorChatHeader';
import { getPatientApi } from '../../api/doctor/doctorPatient';
import { PatientData } from '../../types/userTypes';
import { changeAChatStatus, changeStatus } from '../../api/doctor/doctorAppointmentApi';
import { useSocket } from '../../store/context/socketContext';
import { Socket } from 'socket.io-client';

function DoctorSideChat() {
    const [messages, setMessages] = useState<MessageType[]>([])
    const [messageText, setMessageText] = useState('');
    const [patientData ,setPatientData] = useState<PatientData>({} as PatientData)  
    const doctorId = useSelector((state:RootState)=>state.doctor._id)
    const {_id,patId} = useParams()
    const navigate = useNavigate()
    const socket:Socket = useSocket()

    useEffect(()=>{

        if(!_id || !patId)return notifyError("something wrong pleas try again later") 
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
          setMessages([...messages, {sender: message.sender,receiver:message.receiver, text: message.text}]);
        });
    }, [messages]);
    
    const sendMessage =async () => {

        if(!_id || !patId) return notifyError("Something wrong please try again later") 
        socket.emit('sendMessage', {sender:doctorId,receiver:patId, text: messageText });

        await createMessage({sender:doctorId,receiver:patId, text: messageText })
        setMessageText('');
    };

    const endSession = async() => {

        if(!_id || !patId) return notifyError("Something wrong please try again later")
        const response:ResponseData = await changeAChatStatus(_id,false) 

        if(!response.status) return notifyError(response.message)
        socket.emit('end_session',patId)
        
        const response2:ResponseData = await changeStatus(_id)
        if(!response2.status) return notifyError(response2.message)
        
        navigate(-1)
    }

    const handleCall = async() => {
        socket.emit("call:start",{sender:doctorId,receiver:patId})
        navigate(`/doctor/call/${doctorId}`)
    }

  return (
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col flex-auto h-full p-2">
            <DoctorChatHeader image={patientData.image} name={patientData.firstName + patientData.secondName} id={patientData.id} endSession={endSession} handleCall={handleCall}/>
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
