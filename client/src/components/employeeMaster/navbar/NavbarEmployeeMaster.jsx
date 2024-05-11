/* eslint-disable react/no-unescaped-entities */
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../utils/Auth'
import { useState } from 'react'
import apiInstance from '../../../utils/api/apiInstance'

const NavbarEmployeeMaster = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const [loggingOut, setLoggingOut] = useState(false)

    const handleLogout = async () => {
        setLoggingOut(true)
        try {
            const res = await apiInstance.post('/employeeMaster/logout')
            console.log(res)
            auth.employeeMasterLogout()
            setLoggingOut(false)
            navigate('/employeeMaster/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="navbar border-b-2 border-gray-600 bg-accent">
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
                                <a
                                    onClick={() =>
                                        document
                                            .getElementById('logout-modal')
                                            .showModal()
                                    }
                                >
                                    <FaArrowRightFromBracket />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* logout modal  */}

            <dialog id="logout-modal" className="modal">
                <div className="modal-box w-5/6 max-w-sm bg-white p-4 md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative flex flex-col items-center p-4 text-center sm:p-5">
                        <FaArrowRightFromBracket size={50} className="mb-4" />
                        <p className="text-textp mb-4">
                            Are you sure you want to logout ?
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                type="button"
                                className="btn-black btn btn-outline btn-sm"
                                onClick={() =>
                                    document
                                        .getElementById('logout-modal')
                                        .close()
                                }
                            >
                                No, cancel
                            </button>
                            <button
                                disabled={loggingOut}
                                type="button"
                                className="btn btn-error btn-sm bg-red-600 text-white"
                                onClick={handleLogout}
                            >
                                Yes, I'm sure
                                {loggingOut && (
                                    <span className="loading loading-spinner loading-sm ml-2 text-white"></span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            {/* logout modal end  */}
            <Outlet />
        </>
    )
}

export default NavbarEmployeeMaster
