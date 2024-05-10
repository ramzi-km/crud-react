/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null)

    const adminLogin = (admin) => {
        admin.isLoggedIn = true
        setAdmin(admin)
    }
    const adminLogout = () => {
        const admin = {
            isLoggedIn: false,
        }
        setAdmin(admin)
    }

    return (
        <AuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
