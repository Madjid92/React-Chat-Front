import React, { useState } from 'react';
import './index.css';
import './login.css';
import './chat.css';
import {useNavigate } from "react-router-dom";


function LoginComponent() {
  const [login,setLogin] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();

  async function checkLogin(evnt) {
      evnt.preventDefault();
    
      const httpAddress = "http://localhost:3000";
      const body = JSON.stringify({
        login,
        password
      });
      try {
        const response = await fetch(`${httpAddress}/login`, {
            method: "POST",
            headers :{
              "Content-Type": "application/json",
            },
            body
        }); 
        if(response.status === 200) {
          const data = await response.json();
          localStorage.setItem("token", data.hashPwd);
          navigate("/");
        }
      } catch (e) {
          alert("Error connection")
      };
    }

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
  );
  return elementLogin
}

export default LoginComponent;