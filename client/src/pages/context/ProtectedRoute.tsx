import React from 'react'

import { useLocation, Navigate } from "react-router-dom";

export const ProtectRoute = ({children}: { children: React.ReactNode }) => {
    const location = useLocation()
    const isAuthenticated = localStorage.getItem('signature')
      
    if(!isAuthenticated ){
        return (
            <Navigate to="/" state={{from:location} }/>
        )
    }
    return <div>{children}</div>
}