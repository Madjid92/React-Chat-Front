import ReactDOM from 'react-dom/client';
import './index.css';
import ChatComponent from './chat';
import LoginComponent from './login';
import InscriptionComponent from './inscription';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
//import jsonwebtoken from 'jsonwebtoken';


const root = ReactDOM.createRoot(document.getElementById('root'));

const httpAddress = "http://localhost:3000";

async function getMessages(token) {
  return await fetch(`${httpAddress}/messages`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: token,
      },
  })
  
  };

const router = createBrowserRouter([
    {
      path: "/",
      element : <ChatComponent/>,
      loader : async () => {
        const token  = localStorage.getItem("token");
        if(! token) return redirect("/login");
        const resp  = await getMessages(token)
        if (resp.status === 401) {
            return redirect("/login");
        }
        if(resp.status === 200){
          const messages = await resp.json();
          return messages ;
        }
        return redirect("/login");
      }
    },
    {
      path: "/login",
      element: <LoginComponent />,
    },
    {
      path: "/inscription",
      element: <InscriptionComponent />,
    }
  ]);

root.render(
    <RouterProvider router={router} />
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
