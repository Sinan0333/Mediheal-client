import {createContext,ReactNode, useContext, useMemo} from 'react'
import {io} from 'socket.io-client'

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
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
