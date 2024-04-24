type MessagesProps = {
    username: string
    text: string
}

function Messages({ username, text }:MessagesProps) {
    return (
        <div className="message">
          <p className="message-username">{username}</p>
          <p className="message-text">{text}</p>
        </div>
      );
}

export default Messages
