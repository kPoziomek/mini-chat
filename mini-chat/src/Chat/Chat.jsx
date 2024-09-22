import {useState, useEffect} from "react";
import {io} from 'socket.io-client'
const socket = io('http://localhost:4000')
const Chat = () => {

  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [joined, setJoined] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    socket.on('message',(message)=>{
      setChat(prevChat => [...prevChat, message])
    })

if (message.type === 'leave'){
      setChat(prevChat => [...prevChat, {type: 'notification', text: `${username} left the chat` }])
}
    return () => {
      socket.off('message')
    }
  }, []);


  const joinChat = (e) => {
    e.preventDefault()
    console.log('join chat', e)
    if(username){
      socket.emit('join', username);

      setJoined(true)
    }
  }
const sendMessage = (e) => {
    e.preventDefault()
  if(message){
    socket.emit('sendMessage', message);
    setMessage('')
  }
}

const leaveChat = () => {
  socket.emit("disconnect-me", username, (reason) => {
  })
  setJoined(false)
  setUsername('')
}


  console.log(chat)
  return (
    <div>
      {!joined ? (
        <form id="form" onSubmit={joinChat}>
          <input id="input" type="text"
                 placeholder="Set you nickname"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)} />
       <button type="submit">Join Chat</button>
        </form>
      ):(<div>
        <ul id="messages">
          {chat.map((message,index)=>(
            <li key={index} >
              {message.type === 'notification' ? (<span>{message.text}</span>) : (<span className="userName">{message.username}: <span className="text">{message.text}</span></span>)}
            </li>
          ))}
        </ul>
        <form id="form" onSubmit={sendMessage}>
          <input id="input" type="text"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder="write a message" />
        <button type="submit">Send</button>
          <button type="button" onClick={leaveChat}>
          Quit Chat</button>
        </form>
      </div>)}
    </div>
  );
};

export default Chat;
