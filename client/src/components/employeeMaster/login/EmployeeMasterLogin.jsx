import { useState } from 'react'
import { useAuth } from '../../../utils/Auth'
import { useLocation, useNavigate } from 'react-router-dom'

const EmployeeMasterLogin = () => {
    const [admin, setAdmin] = useState(null)
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/employeeMaster/dashboard'

    const handleLogin = () => {
        auth.adminLogin({ name: admin })
        navigate(redirectPath)
    }
    return (
        <div>
            <label>
                Username:{''}
                <input
                    className="input input-bordered"
                    type="text"
                    onChange={(e) => setAdmin(e.target.value)}
                />
            </label>
            <button onClick={handleLogin} className="btn btn-primary">
                Login
            </button>
        </div>
    )
}

export default EmployeeMasterLogin
