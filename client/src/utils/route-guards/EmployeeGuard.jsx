import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../services/providers/Auth'

const EmployeeGuard = () => {
    const auth = useAuth()
    const location = useLocation()

    const employeeLoggedIn = auth.employee?.isLoggedIn
    return employeeLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate state={{ path: location.pathname }} to="/login" />
    )
}

export default EmployeeGuard
