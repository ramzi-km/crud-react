import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../utils/Auth'

const NavbarEmployeeMaster = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.adminLogout()
        navigate('/employeeMaster/login')
    }

    return (
        <>
            <div className="navbar bg-accent border-b-2 border-gray-600">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-circle btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                        >
                            <li>
                                <Link to="/employeeMaster/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="employeeManagement">
                                    Employee management
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <Link to="dashboard" className="btn btn-ghost text-xl">
                        Crud App - Employee Master
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="avatar btn btn-circle btn-ghost"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                        >
                            <li>
                                <a onClick={handleLogout}>
                                    <FaArrowRightFromBracket />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default NavbarEmployeeMaster
