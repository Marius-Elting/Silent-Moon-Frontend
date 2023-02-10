import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import './RegisterLogin.scss';

const RegisterLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const surNameRef = useRef();

    const handleRegisterSubmit = async () => {
        const user = {
            firstname: firstNameRef.current.value,
            lastname: surNameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value
        }
        const response = await fetch('https://abschlussprojekt-server.up.railway.app/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
    }

    const handleLoginSubmit = async () => {
        const user = {
            password: passwordRef.current.value,
            email: emailRef.current.value
        }
        const response = await fetch('https://abschlussprojekt-server.up.railway.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <section className='registerLoginSection'>
            <ReturnBtn />
            {
                true ? (
                    <article className='login'>
                        <h2 className='registerLoginHeading'>Welcome Back!</h2>
                        <input className='registerLoginInput' type='email' placeholder='EMAIL' ref={emailRef}></input>
                        <input className='registerLoginInput' type='password' placeholder='PASSWORD' ref={passwordRef}></input>
                        <SubmitBtn handleSubmit={handleLoginSubmit}>LOGIN</SubmitBtn>
                        <h3 className='registerLoginText'>
                            DON’T HAVE AN ACCOUNT YET?
                            <Link className='registerLoginLink'> SIGN UP</Link>
                        </h3>
                    </article>
                ) :
                    <article className='register'>
                        <h2 className='registerLoginHeading'>Create your account</h2>
                        <input className='registerLoginInput' type='text' placeholder='FIRSTNAME' ref={firstNameRef}></input>
                        <input className='registerLoginInput' type='text' placeholder='SURNAME' ref={surNameRef}></input>
                        <input className='registerLoginInput' type='email' placeholder='EMAIL' ref={emailRef}></input>
                        <input className='registerLoginInput' type='password' placeholder='PASSWORD' ref={passwordRef}></input>
                        <SubmitBtn handleSubmit={handleRegisterSubmit}> REGISTER</SubmitBtn>
                    </article>
            }
        </section>
    )
}

export default RegisterLogin
