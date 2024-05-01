import { useCallback, useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import peer from "../../service/peer"
import { Socket } from "socket.io-client"
import { useSocket } from "../../store/context/socketContext"
import { call,endCall } from "../../constants/icons"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

function VideoCall() {
    const socket:Socket = useSocket()
    const [myStream, setMyStream] = useState<MediaStream | null>(null)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [remoteSocketId,setRemoteSocketId] = useState<string | null>(null)
    const doctorId = useSelector((state:RootState)=>state.doctor._id)
    const [callAccepted, setCallAccepted] = useState(false)
    const navigate = useNavigate()
    const {_id} = useParams()

    const startMyStream = useCallback(async({receiver}:{receiver:string})=>{
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        const offer =await peer.getOffer()        
        socket.emit('user:call', {to:receiver, offer})
        setMyStream(stream)
    },[socket])

    const handleIncomingCall = useCallback(async({from, offer}:{from:string, offer:string})=>{
        setRemoteSocketId(from)
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        setMyStream(stream)
        const ans = await peer.getAnswer(offer)
        socket.emit("call:accepted",{to:from, ans})
    },[socket])

    const sendStreams = useCallback(()=>{
        if(myStream){
            for(const track of myStream.getTracks() ){
                peer.peer?.addTrack(track, myStream)
            }    
        }
    },[myStream])

    const handleCallAccepted = useCallback(async({from, ans}:{from:string, ans:any})=>{
        setRemoteSocketId(from)
        await peer.setLocalDescription(ans)
        sendStreams()
           
    },[sendStreams])

    const handleNegotiationneeded = useCallback(async()=>{
        const offer = await peer.getOffer()
        socket.emit("peer:negotiationneeded",{offer,to:remoteSocketId})
    },[remoteSocketId,socket])

    useEffect(()=>{
        peer.peer?.addEventListener("negotiationneeded",handleNegotiationneeded)
        return ()=>{
            peer.peer?.removeEventListener("negotiationneeded",handleNegotiationneeded)
        }
    },[handleNegotiationneeded])

    const handleNegotiationIncoming = useCallback(async({from,offer}:{from:string,offer:any})=>{
        const ans = await peer.getAnswer(offer)
        socket.emit("peer:negotiationDone",{to:from,ans})
    },[socket])

    const handleNegotiationFinal = useCallback(async({ans}:{ans:any})=>{
        await peer.setLocalDescription(ans)
    },[])

    useEffect(()=>{
        peer.peer?.addEventListener("track",async (ev)=>{
            const remoteStream = ev.streams
            setRemoteStream(remoteStream[0])
        })
    },[])

    const handleOpponentCallEnd = useCallback(()=>{
        if (myStream) {
            myStream.getTracks().forEach(track => {
                track.stop();
            });
        }
        setMyStream(null);
        if (remoteStream) {
            remoteStream.getTracks().forEach(track => {
                track.stop();
            });
        }
        setRemoteStream(null);
        navigate(-1)
    },[])

    const handleEndCall = () => {
        socket.emit("call:end",{to:remoteSocketId})
        if (myStream) {
            myStream.getTracks().forEach(track => {
                track.stop();
            });
        }
        setMyStream(null);
        if (remoteStream) {
            remoteStream.getTracks().forEach(track => {
                track.stop();
            });
        }
        setRemoteStream(null);
        navigate(-1)
    }



    useEffect(()=>{
        socket.on("call:start",startMyStream)
        socket.on("incoming:call",handleIncomingCall)
        socket.on("call:accepted",handleCallAccepted)
        socket.on("peer:negotiationneeded",handleNegotiationIncoming)
        socket.on("peer:negotiationFinal",handleNegotiationFinal)
        socket.on("call:end",handleOpponentCallEnd)

        return ()=>{
            socket.off("call:start")
            socket.off("incoming:call")
            socket.off("call:accepted")
            socket.off("peer:negotiationneeded")
            socket.off("peer:negotiationFinal")
            socket.off("call:end")
        }
    },[socket,startMyStream,handleIncomingCall,handleCallAccepted,handleNegotiationIncoming,handleNegotiationFinal,handleOpponentCallEnd])

    return (
        <div className="bg-black h-screen">
          {myStream && (
            <div className="ml-6 mt-6 absolute">
                <ReactPlayer playing={true}  url={myStream} width="30%" height="30%" />
            </div>
          )}
          {remoteStream &&( 
            <div className="flex justify-center items-center  h-[92vh]">
                <ReactPlayer playing={true}  url={remoteStream} width="60%" height="100%" />
            </div>
          )}
           {myStream && (
            <div className="flex justify-center mt-4">
                {
                    (!callAccepted && doctorId !==_id) && (
                        <div className="w-8 h-8 cursor-pointer bg-green-500 rounded-full p-1 mr-3" onClick={()=>{sendStreams() ,setCallAccepted(!callAccepted)}}>
                            <img src={call} alt="" />
                        </div>
                    )
                }
                <div className="w-8 h-8 cursor-pointer bg-red-600 rounded-full p-1" onClick={handleEndCall}>
                    <img src={endCall} alt="" />
                </div>
            </div>
            )}
        </div>
      );
}
export default VideoCall
