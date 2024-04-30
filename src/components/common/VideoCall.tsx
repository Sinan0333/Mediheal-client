import { useCallback, useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import peer from "../../service/peer"
import { Socket } from "socket.io-client"
import { useSocket } from "../../store/context/socketContext"

function VideoCall() {
    const socket:Socket = useSocket()
    const [myStream, setMyStream] = useState<MediaStream | null>(null)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
    const [remoteSocketId,setRemoteSocketId] = useState<string | null>(null)

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

    const sendStreams = useCallback(async()=>{
        if(myStream){
            for(const track of myStream.getTracks() ){
                peer.peer?.addTrack(track, myStream)
            }    
        }
    },[myStream])

    const handleCallAccepted = useCallback(async({from, ans}:{from:string, ans:any})=>{
        setRemoteSocketId(from)
        peer.setLocalDescription(ans)
        sendStreams()
           
    },[sendStreams])

    const handleNegotiationneeded = useCallback(async()=>{
        const offer = await peer.getOffer()
        socket.emit("peer:negotiationneeded",{offer,to:remoteSocketId})
    },[])

    const handleNegotiationIncoming = useCallback(async({from,offer}:{from:string,offer:string})=>{
        const ans =await peer.getAnswer(offer)
        socket.emit("peer:negotiationDone",{to:from,ans})
    },[socket])

    const handleNegotiationFinal = useCallback(async({ans}:{from:string,ans:string})=>{
        await peer.setLocalDescription(ans)
    },[])

    useEffect(()=>{
        peer.peer?.addEventListener("negotiationneeded",handleNegotiationneeded)
        return ()=>{
            peer.peer?.removeEventListener("negotiationneeded",handleNegotiationneeded)
        }
    },[])

    useEffect(()=>{
        peer.peer?.addEventListener("track",async ev=>{
            const remoteStream = ev.streams
            setRemoteStream(remoteStream[0])
        })
    },[])

    useEffect(()=>{
        socket.on("call:start",startMyStream)
        socket.on("incoming:call",handleIncomingCall)
        socket.on("call:accepted",handleCallAccepted)
        socket.on("peer:negotiationneeded",handleNegotiationIncoming)
        socket.on("peer:negotiationFinal",handleNegotiationFinal)

        return ()=>{
            socket.off("call:start")
            socket.off("incoming:call")
            socket.off("call:accepted")
            socket.off("peer:negotiationneeded")
        }
    },[socket,startMyStream,handleIncomingCall,handleCallAccepted,handleNegotiationIncoming,handleNegotiationFinal])

    return (
        <div>
            {myStream && (
                <button onClick={sendStreams}>send stream</button>
            )}
          {myStream && (
            <>
              <h1 className="text-2xl font-bold">My stream</h1>
              <ReactPlayer playing={true} muted url={myStream} width="50%" height="50%" />
            </>
          )}
          {remoteStream &&( 
          <>
          <h1>remote stream</h1>
          <ReactPlayer playing={true} muted url={remoteStream} width="50%" height="50%" />
          </>
          )}
        </div>
      );
}
export default VideoCall
