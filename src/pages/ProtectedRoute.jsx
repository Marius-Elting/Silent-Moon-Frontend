import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = useSelector(state => state.user.token)
    const user = true
    if (!token) {
        return <Navigate to="/landing" />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute
