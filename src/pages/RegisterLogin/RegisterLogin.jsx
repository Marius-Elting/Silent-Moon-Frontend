import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import { loginUser, registerUser } from '../../store/user-actions';
import './RegisterLogin.scss';
import Loading from '../../components/Loading/Loading';

const RegisterLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const surNameRef = useRef();
    const navigate = useNavigate();
    const { action } = useParams();
    const dispatch = useDispatch();
    const alert = useSelector(state => state.ui.alertIsVisible);



    useEffect(() => {
        if (action === "guest") {
            handleGuestMode()
        }
    }, [])

    const handleRegisterSubmit = async () => {
        const user = {
            firstname: firstNameRef.current.value,
            lastname: surNameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value
        };
        dispatch(registerUser({ user, navToHome }));
    };

    const navToHome = () => {
        navigate("/start");
    };

    const handleLoginSubmit = async () => {
        const user = {
            password: passwordRef.current.value,
            email: emailRef.current.value
        };
        dispatch(loginUser({ user, navToHome }));
    };


    const handleGuestMode = async () => {
        const user = {
            password: "SilentMoonGuest123",
            email: "guest@silentMoonGuest.de"
        }
        dispatch(loginUser({ user, navToHome }));
    }

    const checkEnterKey = (e) => {
        if (e.key === "Enter") {
            handleLoginSubmit();
        }
    };



    return (
        <section className='registerLoginSection'>
            {
                action === "login" ? (
                    <article className='login'>
                        <ReturnBtn link={"/landing"} />
                        <h2 className='registerLoginHeading'>Welcome Back!</h2>
                        {!alert && <div className="AlertPlaceholder"></div>}
                        {alert && <Alert />}

                        <input disabled={alert ? true : false} className='registerLoginInput' type='email' placeholder='EMAIL' ref={emailRef}></input>
                        <input onKeyDown={checkEnterKey} disabled={alert ? true : false} className='registerLoginInput' type='password' placeholder='PASSWORD' ref={passwordRef}></input>
                        <SubmitBtn disabled={alert ? true : false} handleSubmit={handleLoginSubmit}>LOGIN</SubmitBtn>
                        <h3 className='registerLoginText'>
                            DON’T HAVE AN ACCOUNT YET?
                            <Link to="/user/register" className='registerLoginLink'> SIGN UP</Link>
                        </h3>
                    </article>
                ) : action === "register" ? (
                    <article className='register'>
                        <ReturnBtn link={"/user/login"} />
                        <h2 className='registerLoginHeading'>Create your account</h2>
                        {!alert && <div className="AlertPlaceholder"></div>}
                        {alert && <Alert />}
                        <input disabled={alert ? true : false} className='registerLoginInput' type='text' placeholder='FIRSTNAME' ref={firstNameRef}></input>
                        <input disabled={alert ? true : false} className='registerLoginInput' type='text' placeholder='SURNAME' ref={surNameRef}></input>
                        <input disabled={alert ? true : false} className='registerLoginInput' type='email' placeholder='EMAIL' ref={emailRef}></input>
                        <input onKeyDown={checkEnterKey} disabled={alert ? true : false} className='registerLoginInput' type='password' placeholder='PASSWORD' ref={passwordRef}></input>
                        <SubmitBtn disabled={alert ? true : false} handleSubmit={handleRegisterSubmit}> REGISTER</SubmitBtn>
                    </article>
                ) : (
                    <article className="register">
                        <Loading customStyle={{ position: "fixed", transform: "translate(-50%,-50%)", top: "50%", left: "50%" }} />
                        <h2 className='registerLoginHeading' style={{ position: "fixed", transform: "translate(-50%,-50%)", top: "55%", left: "50%", width: "100%" }}>Logging in...</h2>
                    </article>
                )

            }
        </section>
    );
};

export default RegisterLogin;
