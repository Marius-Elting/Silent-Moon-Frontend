import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const user = true
    if (!user) {
        return <Navigate to="/user/register" />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute
