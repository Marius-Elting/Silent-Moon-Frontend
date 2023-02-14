import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import { uiActions } from '../../store/ui-slice';
import { loginUser } from '../../store/user-actions';
import { userActions, userActionsd } from '../../store/user-slice';
import './RegisterLogin.scss';

const RegisterLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const surNameRef = useRef();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const userData = useSelector(state => state.user)
    const alert = useSelector(state => state.ui.alertIsVisible)
    const alertType = useSelector(state => state.ui.alertType)

    console.log(alert)
    console.log(userData)

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

    const navToHome = () => {
        navigate("/home")
    }

    const handleLoginSubmit = async () => {
        const user = {
            password: passwordRef.current.value,
            email: emailRef.current.value
        }
        dispatch(loginUser({ user, navToHome }))
    }

    return (
        <section className='registerLoginSection'>
            <ReturnBtn />
            {
                true ? (
                    <article className='login'>
                        <h2 className='registerLoginHeading'>Welcome Back!</h2>
                        {alert && <Alert />}

                        <input disabled={alert ? true : false} className='registerLoginInput' type='email' placeholder='EMAIL' ref={emailRef}></input>
                        <input disabled={alert ? true : false} className='registerLoginInput' type='password' placeholder='PASSWORD' ref={passwordRef}></input>
                        <SubmitBtn disabled={alert ? true : false} handleSubmit={handleLoginSubmit}>LOGIN</SubmitBtn>
                        <h3 className='registerLoginText'>
                            DON’T HAVE AN ACCOUNT YET?
                            <Link className='registerLoginLink'> SIGN UP</Link>
                        </h3>
                    </article>
                ) :
                    <article className='register'>
                        <h2 className='registerLoginHeading'>Create your account</h2>
                        {alert && <Alert />}

                        <input disabled={alert ? true : false} className='registerLoginInput' type='text' placeholder='FIRSTNAME' ref={firstNameRef}></input>
                        <input disabled={alert ? true : false} className='registerLoginInput' type='text' placeholder='SURNAME' ref={surNameRef}></input>
                        <input disabled={alert ? true : false} className='registerLoginInput' type='email' placeholder='EMAIL' ref={emailRef}></input>
                        <input disabled={alert ? true : false} className='registerLoginInput' type='password' placeholder='PASSWORD' ref={passwordRef}></input>
                        <SubmitBtn disabled={alert ? true : false} handleSubmit={handleRegisterSubmit}> REGISTER</SubmitBtn>
                    </article>
            }
        </section>
    )
}

export default RegisterLogin
