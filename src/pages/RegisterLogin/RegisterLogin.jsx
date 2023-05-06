import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';
import ReturnBtn from '../../components/ReturnBtn/ReturnBtn';
import SubmitBtn from '../../components/SubmitBtn/SubmitBtn';
import { uiActions } from '../../store/ui-slice';
import { loginUser, registerUser } from '../../store/user-actions';
import { userActions, userActionsd } from '../../store/user-slice';
import './RegisterLogin.scss';

const RegisterLogin = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const surNameRef = useRef();
    const navigate = useNavigate();
    const { action } = useParams();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const alert = useSelector(state => state.ui.alertIsVisible);
    const alertType = useSelector(state => state.ui.alertType);


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
        if (window.outerWidth >= 900) {
            navigate("/home");
        } else {
            navigate("/start");
        }
    }

    const handleLoginSubmit = async () => {
        const user = {
            password: passwordRef.current.value,
            email: emailRef.current.value
        };
        dispatch(loginUser({ user, navToHome }));
    };

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
                ) :
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
            }
        </section>
    );
};

export default RegisterLogin;
