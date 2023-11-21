import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import { useLoaderData } from 'react-router-dom';

const httpAddress = "http://localhost:3000";
const { io } = require("socket.io-client");
const socket = io("localhost:3000");
socket.on("connect", () => {
  console.log("connection to socket", socket.id);
});

function MsgComponent({message}) {
  const {login, content} = message;
  return <span> {login}  :  {content}</span>
};

async function saveMessages(msg) {
    if (!msg) return;
    const token = localStorage.getItem("token");
    return await fetch(`${httpAddress}/messages/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify({ msg })
    })
  };
  
function ChatComponent() {

    const msgs = useLoaderData();
    const [messages,setMessages] = useState(msgs);
    const [newMessage,setNewMessage] = useState();
 
    useEffect(() => {
      if(!newMessage) return;
      setMessages([...messages , newMessage]);
    }
    ,[newMessage])
  
    useEffect(() => {
      socket.on("message", (msg) =>{
        setNewMessage(msg);
      })
    },[])

    const messageRef = useRef(null);

    const elementMsg = (
      <div>
          <header>
              <h1> Messagerie des internautes</h1>
          </header>
          <main>
              <div className="titleChatBox">
                  <h2>Espace messagerie:</h2>
              </div>
              <div className="chatBox" id ="chatBox">
                { 
                  messages.map( (msg, index)=> <div key={index}><MsgComponent  message={msg}/></ div>)
                }
                  
              </div>
              <div>
                  <label htmlFor='valueMessage'>Insérez votre message</label>
                  <input name='inputMsg' type="text" id="valueMessage" ref={messageRef} />
                  <input type="button" value="Envoyer" onClick={
                    ()=> { 
                      saveMessages(messageRef.current.value);
                  }} />
              </div>
          </main>
      </div>
    )
    return elementMsg
  }

export default ChatComponent;