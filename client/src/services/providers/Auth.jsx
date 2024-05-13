/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [employeeMaster, setEmployeeMaster] = useState(null)
    const [employee, setEmployee] = useState(null)

    const employeeLogin = (employee) => {
        employee.isLoggedIn = true
        setEmployee(employee)
    }
    const employeeLogout = () => {
        const employee = {
            isLoggedIn: false,
        }
        setEmployee(employee)
    }

    const employeeMasterLogin = (employeeMaster) => {
        employeeMaster.isLoggedIn = true
        setEmployeeMaster(employeeMaster)
    }
    const employeeMasterLogout = () => {
        const employeeMaster = {
            isLoggedIn: false,
        }
        setEmployeeMaster(employeeMaster)
    }

    return (
        <AuthContext.Provider
            value={{
                employee,
                employeeLogin,
                employeeLogout,
                employeeMaster,
                employeeMasterLogin,
                employeeMasterLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
