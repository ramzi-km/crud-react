import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../utils/Auth'
import { FaArrowRight, FaArrowRightFromBracket } from 'react-icons/fa6'

const Dashboard = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.adminLogout()
        navigate('/employeeMaster/login')
    }
    return (
        <>
            <div className="mt-36 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-semibold ">
                    {' '}
                    Welcome to Dashboard {auth.admin}
                </h1>
                <br />
                <div className="flex flex-col space-y-4">
                    <Link
                        to="/employeeMaster/employeeManagement"
                        className="btn"
                    >
                        Employee Management <FaArrowRight />
                    </Link>
                    <button onClick={handleLogout} className="btn btn-error">
                        Logout <FaArrowRightFromBracket />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Dashboard
