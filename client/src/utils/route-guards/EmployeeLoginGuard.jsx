import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../services/providers/Auth'

const EmployeeLoginGuard = () => {
    const auth = useAuth()
    const employeeLoggedIn = auth.employee?.isLoggedIn

    return employeeLoggedIn ? <Navigate to="/home" /> : <Outlet />
}

export default EmployeeLoginGuard
