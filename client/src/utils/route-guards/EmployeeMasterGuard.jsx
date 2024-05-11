import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../services/providers/Auth'

const EmployeeMasterGuard = () => {
    const auth = useAuth()
    const location = useLocation()

    const employeeMasterLoggedIn = auth.employeeMaster?.isLoggedIn
    return employeeMasterLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate
            state={{ path: location.pathname }}
            to="/employeeMaster/login"
        />
    )
}

export default EmployeeMasterGuard
