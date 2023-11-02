import React, { useState } from 'react';
import './chat.css';


function MessagesInputComponent () {
    //const [message,setMessage] = useState();
    const element = (
        <div>
            <header>
                <h1> Messagerie des internautes</h1>
            </header>
            <main>
                <div className="titleChatBox">
                    <h2>Espace messagerie:</h2>
                </div>
                <div className="chatBox" id ="chatBox"></div>
                <div>
                    <label >Insérez votre message</label>
                    <input type="text" id="valueMessage"/>  
                    <input type="button" value="Envoyer"/>
                </div>
                <script src="chat.js" defer></script>
            </main>
        </div>
    );
    return element
} 

export default MessagesInputComponent;