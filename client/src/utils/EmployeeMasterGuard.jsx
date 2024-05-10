import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './Auth'

const EmployeeMasterGuard = () => {
    const auth = useAuth()
    const location = useLocation()

    const adminLoggedIn = auth.admin?.isLoggedIn
    return adminLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate
            state={{ path: location.pathname }}
            to="/employeeMaster/login"
        />
    )
}

export default EmployeeMasterGuard
