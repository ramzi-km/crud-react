import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './Auth'

const EmployeeMasterLoginGuard = () => {
    const auth = useAuth()
    const employeeMasterLoggedIn = auth.employeeMaster?.isLoggedIn

    return employeeMasterLoggedIn ? (
        <Navigate to="/employeeMaster/dashboard" />
    ) : (
        <Outlet />
    )
}

export default EmployeeMasterLoginGuard
