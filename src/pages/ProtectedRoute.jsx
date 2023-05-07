import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { uiActions } from '../store/ui-slice';
import { logoutuser } from '../store/user-actions';
import { userActions } from '../store/user-slice';
import Loading from '../components/Loading/Loading';
// import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = () => {
    // const token = useSelector(state => state.user.token);
    // const userData = useSelector(state => state.user.userData);
    const [isAuth, setIsAuth] = useState(null)
    const dispatch = useDispatch();
    const location = useLocation()

    const checkIsAuth = async () => {
        fetch(process.env.REACT_APP_BACKEND_URL + "/api/isAuth", {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                if (data.message) {
                    setIsAuth(false)
                    return
                }
                console.log(data)
                setIsAuth(true)
                dispatch(userActions.login({
                    user: data.user,
                    token: data.token
                }))
            })
    }
    useEffect(() => {
        checkIsAuth()
    }, [location.pathname])


    // if (!user) {
    //     return <Navigate to="/landing" />;
    // }
    if (isAuth === false) {
        dispatch(uiActions.showAlert({
            type: "error",
            message: "User not logged in! redirecting...",
            color: "red"
        }));
        setTimeout(() => {
            dispatch(uiActions.unShowLoading());
            dispatch(uiActions.unshowAlert());
            // dispatch(logoutuser());
        }, 100);
    }

    if (isAuth === null) {
        return (
            <Loading customStyle={{ position: "fixed", transform: "translate(-50%,-50%)", top: "50%", left: "50%" }} />
        )
    } else if (!isAuth) {
        return (
            <Navigate to="/landing" replace={true} />
        )
    } else if (isAuth) {
        return (
            <Outlet />
        )
    }
};

export default ProtectedRoute;
