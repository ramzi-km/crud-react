import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './Auth'

const EmployeeMasterLoginGuard = () => {
    const auth = useAuth()
    const admin = auth.admin
    return admin ? <Navigate to="/employeeMaster/dashboard" /> : <Outlet />
}

export default EmployeeMasterLoginGuard
