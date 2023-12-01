import React, { useState } from 'react';
import './login.css';
import {useNavigate, Link } from "react-router-dom";


function InscriptionLink() {
    return (
        <div>
            <ul>
                <li><Link to="/inscription">Inscription link</Link></li>
            </ul>
        </div>
    );
};

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
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      } catch (e) {
          alert("Error connection")
      };
    }

  const elementLogin = (
    <div>
        <header className='headerLogin'>
            <h1>Bienvenue au forum des développeurs</h1>
        </header>
        <main>
            <form onSubmit={checkLogin}>
                <div className="labelsInputsLogin">
                    <label className='loginLabel' htmlFor="userLogin">Login</label>
                    <input className='login_Input' name="login" type="text" id='userLogin' onChange={(e)=> setLogin(e.target.value)} />
                    <label className='loginPasswordLabel' htmlFor="userMotDePasse">Mot de Passe</label>
                    <input className='loginPasswordInput' name="password" type="text" id='userMotDePasse' onChange={(e)=> setPassword(e.target.value)}/> 
                    <button className='loginButton'>Se connecter</button>
                </div>
            </form>
            <div>
              <InscriptionLink/>
            </div>
        </main>
    </div>
  );
  return elementLogin
}

export default LoginComponent;