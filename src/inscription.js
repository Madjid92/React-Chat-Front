import { useState } from 'react';
import './inscription.css';

function InscriptionComponent(){
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [login,setLogin] = useState();
    const [password,setPassword] = useState();
    const [passConfirm,setPassConfirm] = useState();
    const [email,setEmail] = useState();
    const [userAdded,setUserAdded] = useState(false);

    function MsgUserAdded(){
        if (userAdded){
            return <span className='msgUseradded'>{"User added !"}</span>
        }
    };
    
    async function sendInscription(evnt){
        evnt.preventDefault();
        
        if (password !== passConfirm){
            return alert("Password confirmation error !")
        };
        const httpAddress = "http://localhost:3000";
        const body = JSON.stringify({
            firstName,
            lastName,
            login,
            password,
            email
        });
        try {
            const response = await fetch(`${httpAddress}/inscription`, {
                method: "POST",
                headers :{
                "Content-Type": "application/json",
                },
                body
            }); 
            if(response.status === 200) {
                setUserAdded(true);
            return response;
            }
        } catch (e) {
            console.error(e)
            return false
        };
    };

    const element = (
        <div>
            <header>
                <h1>Bienvenue à la page d'inscription du forum des développeurs</h1>
            </header>
            <main>
                <form onSubmit={sendInscription}>
                    <div className="labelsInputsLogin">
                        <label htmlFor="firstName">First Name</label>
                        <input name="first_name" type="text" id='firstName' required onChange={(e)=> setFirstName(e.target.value)}/><br/>
                        <label htmlFor="lastName">Last Name</label>
                        <input name="last_name" type="text" id='lastName' required onChange={(e)=> setLastName(e.target.value)}/><br/>
                        <label htmlFor="userLogin">Login</label>
                        <input name="login" type="text" id='userLogin' required onChange={(e)=> setLogin(e.target.value)}/><br/>
                        <label htmlFor="email">Email</label>
                        <input name="e_mail" type="email" id='email' required onChange={(e)=> setEmail(e.target.value)}/><br/>
                        <label htmlFor="userMotDePasse">Password</label>
                        <input name="password" type="text" id='userMotDePasse' required onChange={(e)=> setPassword(e.target.value)}/><br/>
                        <label htmlFor="passwordConfirmation">Password confirmation</label>
                        <input name="password_Confirmation" type="text" id='passwordConfirmation' required onChange={(e)=> setPassConfirm(e.target.value)}/><br/>
                        <button>Envoyer</button> <span><MsgUserAdded/></span>
                    </div>
                </form>
            </main>
        </div>
      );
    return element
};

export default InscriptionComponent;
