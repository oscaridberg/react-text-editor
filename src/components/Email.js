import React, { useEffect, useRef } from 'react';
import config from '../config/config.json';
import { useState } from 'react';
import emailModel from '../models/email';

export default function Email({setPopup}) {
    const [email, setEmail] = useState(null);

    function closePopup () {
        setPopup(false)
    }

    function changeHandler (event) {
        setEmail(event.target.value)
    }

    async function sendEmail () {
        emailModel.sendEmail(email);
    }

    return (
    <div className="modal">
        <div className="modal_content">
        <span className="close" onClick={closePopup}>&times;    </span>
        <h1>Invite a friend</h1>
        <div className='emailContainer'>
            <p className='loginTitle'>Email</p>
            <input type="email" name="email" onChange={changeHandler}></input>
        </div>
        <button className='registerButton' onClick={sendEmail}>Send invite</button>
        </div>
    </div>
    );
}

