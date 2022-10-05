import { useState } from 'react';
import authModel from '../models/auth';

export default function Login({setToken, user, setUser}) {

    function changeHandler(event) {
        let newObject = {};
        newObject[event.target.name] = event.target.value;

        setUser({...user, ...newObject});
    };

    async function register() {
        await authModel.register(user);
        await login();
    };

    async function login() {
        const result = await authModel.login(user);
        if (result.data) {
            setToken(result.data.token);
        } else {
            console.log('invalid user');
        }
    }

    return (
        <div className='loginContainer'>
        <h1>Login or register</h1>
            <p className='loginTitle'>Email:</p>
            <input type="email" name="email" onChange={changeHandler} />

            <p className='loginTitle'>Password:</p>
            <input type="password" name="password" onChange={changeHandler} />

            <button className='registerButton' onClick={register} >Register</button>
            <button className='loginButton' onClick={login} >Login</button>
        </div>
    );
}