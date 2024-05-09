import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './Auth'

const EmployeeMasterGuard = () => {
    const auth = useAuth()
    const location = useLocation()

    const admin = auth.admin
    return admin ? (
        <Outlet />
    ) : (
        <Navigate
            state={{ path: location.pathname }}
            to="/employeeMaster/login"
        />
    )
}

export default EmployeeMasterGuard
