import {createContext,ReactNode, useContext, useEffect, useMemo} from 'react'
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client'
import { RootState } from '../store';

interface SocketProviderProps {
    children: ReactNode;
}

const SocketContext = createContext<any>(null)

export const useSocket = () => {
    const socket = useContext(SocketContext)
    return socket
}

export const SocketProvider = ({children}:SocketProviderProps) => {
    const socket = useMemo(()=>io('http://localhost:3000'),[])
    const userId = useSelector((state:RootState)=>state.user._id)
    const doctorId = useSelector((state:RootState)=>state.doctor._id)
    useEffect(() => {
        if(userId) socket.emit("add_user", userId)
        if(doctorId) socket.emit("add_doctor", doctorId)
    },[socket,userId,doctorId])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
