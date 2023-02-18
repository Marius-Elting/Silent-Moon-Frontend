import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { uiActions } from '../store/ui-slice';
import { logoutuser } from '../store/user-actions';
// import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = () => {
    const token = useSelector(state => state.user.token);
    const user = true;
    const userData = useSelector(state => state.user.userData);
    const dispatch = useDispatch();
    if (!user) {
        return <Navigate to="/landing" />;
    }
    if (userData === null) {
        dispatch(uiActions.showAlert({
            type: "error",
            message: "User not logged in! redirecting...",
            color: "red"
        }));
        setTimeout(() => {

            dispatch(logoutuser());
        }, 500);
    }

    return (
        <Outlet />
    );
};

export default ProtectedRoute;
