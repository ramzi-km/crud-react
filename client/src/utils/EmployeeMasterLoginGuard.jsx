import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './Auth'

const EmployeeMasterLoginGuard = () => {
    const auth = useAuth()
    const adminLoggedIn = auth.admin?.isLoggedIn

    return adminLoggedIn ? (
        <Navigate to="/employeeMaster/dashboard" />
    ) : (
        <Outlet />
    )
}

export default EmployeeMasterLoginGuard
