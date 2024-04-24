import  { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';

const socket = io('http://localhost:3000');

function Chat() {

    const [messages, setMessages] = useState<{ text: string ,username: string}[]>([])
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
          setMessages([...messages, message]);
        });
      }, [messages]);
    
      const sendMessage = () => {
        socket.emit('sendMessage', { text: messageText });
        setMessageText('');
      };

  return (
    <div className="App">
    <h1>Real-Time Chat App</h1>
    <div className="messages">
      {messages.map((message, index) => (
        <Messages key={index} username={message.username} text={message.text} />
      ))}
    </div>
    <div className="input-box">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
  )
}

export default Chat
