import React, { useEffect, useRef, useState } from 'react';
//import ReactDOM from 'react-dom/client';
import './index.css';
import './login.css';
import './chat.css';

//import MessagesInputComponent from './chat';
//import App from './App';
//import reportWebVitals from './reportWebVitals';  

const httpAddress = "http://localhost:3000";

const { io } = require("socket.io-client");
const socket = io("localhost:3000");
socket.on("connect", () => {
  console.log("connection to socket", socket.id); // x8WIv7-mJelg7on_ALbx
});

function MsgComponent({message}) {
  const {login, content} = message;
  return <span> {login}  :  {content}</span>
}

function LoginComponent({checkLogin,setLogin,setPassword}) {
  const elementLogin = (
    <div>
        <header>
            <h1>Bienvenue au forum des développeurs</h1>
        </header>
        <main>
            <form onSubmit={checkLogin}>
                <div className="labelsInputsLogin">
                    <label htmlFor="userLogin">Login</label>
                    <input name="login" type="text" id='userLogin' onChange={(e)=> setLogin(e.target.value)} />
                    <label htmlFor="userMotDePasse">Mot de Passe</label>
                    <input name="password" type="text" id='userMotDePasse' onChange={(e)=> setPassword(e.target.value)}/> 
                    <button>Envoyer</button>
                </div>
            </form>
        </main>
    </div>
  )
  return elementLogin
}


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


async function getMessages(token) {
  return await fetch(`${httpAddress}/messages`, {
      method: "GET",
      //mode: 'same-origin',
      headers: {
        "Content-Type": "application/json",
          Authorization: token,
      },
  })

};

function ChatComponent({token}) {
  const [messages,setMessages] = useState([]);
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

  useEffect(() => {
    getMessages(token).then( resp => {
      if (resp.status !== 200) {
          window.location.href = "/login"
          return;
      }
       resp.json().then(
        msgs => setMessages(msgs)
       )
    });   
  }
  ,[]);
  
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
                messages.map( (msg, index)=> <><MsgComponent key={index} message={msg}/><br/></>)
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



function LoginInputsComponent () {
  const [login,setLogin] = useState();
  const [password,setPassword] = useState();
  const [token,setToken] = useState();
  async function checkLogin(evnt) {
    evnt.preventDefault();
    const body = JSON.stringify({
      login,
      password
    });
    //console.log(body);
    try {
      const response = await fetch(`${httpAddress}/login`, {
          method: "POST",
          //mode: 'same-origin',
          headers :{
            "Content-Type": "application/json",
          },
          body
      }); 
      localStorage.setItem("token", (await response.json()).hashPwd);
      setToken(localStorage.getItem("token"));
      //window.location.href = "/";
    } catch (e) {
        alert("Error connection")
    }
    return false
  };

  if (token) {
    return <ChatComponent token={token}  />
  } else {
    return <LoginComponent checkLogin= {checkLogin} setLogin={setLogin} setPassword={setPassword}/>
  };
}



export default LoginInputsComponent;