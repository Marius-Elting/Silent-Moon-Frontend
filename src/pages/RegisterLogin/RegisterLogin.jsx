import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import './RegisterLogin.scss';

const RegisterLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const surnameRef = useRef();

    return (
        <section className='registerLoginSection'>
            <ReturnBtn />
            {
                false ? (
                    <article className='login'>
                        <h2 className='registerLoginHeading'>Welcome Back!</h2>
                        <input className='registerLoginInput' type='email' placeholder='EMAIL' ref={emailRef}></input>
                        <input className='registerLoginInput' type='password' placeholder='PASSWORD' ref={passwordRef}></input>
                        <SubmitBtn />
                        <p className='registerLoginParagraph'>
                            DON’T HAVE AN ACCOUNT YET?
                            <Link className='registerLoginLink'> SIGN UP</Link>
                        </p>
                    </article>
                ) :
                    <article className='register'>
                        <h2 className='registerLoginHeading'>Create your account</h2>
                        <input className='registerLoginInput' type='text' placeholder='FIRSTNAME' ref={firstNameRef}></input>
                        <input className='registerLoginInput' type='text' placeholder='SURNAME' ref={surnameRef}></input>
                        <input className='registerLoginInput' type='email' placeholder='EMAIL' ref={emailRef}></input>
                        <input className='registerLoginInput' type='password' placeholder='PASSWORD' ref={passwordRef}></input>
                        <SubmitBtn />
                    </article>
            }
        </section>
    )
}

export default RegisterLogin
