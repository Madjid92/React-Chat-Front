import { useState } from 'react';
import './inscription.css';


function ElemInput({ valueType, prop, handlechange }) {

    return (
        <span>
            <label htmlFor={prop}>{prop}</label>
            <input className={prop + "Input"} type={valueType} id={prop} required 
            onChange={(e) => handlechange(e, prop)} />
        </span>

    )
};


function InscriptionComponent() {

    const states = {}
    const [userAdded, setUserAdded] = useState(false);

    const handlechange = (e , prop) => { states[prop] = (e.target.value); console.log(states) }
    

    function MsgUserAdded() {
        if (userAdded) {
            return <span className='msgUseradded'>{"User added !"}</span>
        }
    };

    async function sendInscription(evnt) {
        evnt.preventDefault();
        if (states.password !== states.password_confirmation) {
            return alert("Password confirmation error !")
        };
        const { first_name, last_name, login, email, password } = states;
        const httpAddress = "http://localhost:3000";
        const body = JSON.stringify({
            first_name,
            last_name,
            login,
            email,
            password
        });
        try {
            const response = await fetch(`${httpAddress}/inscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            });
            if (response.status === 200) {
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
                <p className='textInscription'>Veuillez compléter le formulaire suivant : </p>
                <form onSubmit={sendInscription}>
                    <div className="labelsInputsInscription">
                        <ElemInput valueType={'text'} prop={'first_name'} handlechange={handlechange}/><br />
                        <ElemInput valueType={'text'} prop={'last_name'}   handlechange={handlechange}/><br />
                        <ElemInput valueType={'text'} prop={'login'}  handlechange={handlechange}/><br />
                        <ElemInput valueType={'email'} prop={'email'}  handlechange={handlechange}/><br />
                        <ElemInput valueType={'text'} prop={'password'}  handlechange={handlechange} /><br />
                        <ElemInput valueType={'text'} prop={'password_confirmation'}  handlechange={handlechange} /><br />
                        <div className='divSubmission'>
                            <button className='buttonSubmission'>Envoyer</button> <span><MsgUserAdded /></span>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );

    return element
};

export default InscriptionComponent;
