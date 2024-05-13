/* eslint-disable react/no-unescaped-entities */
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../services/providers/Auth'
import { useState } from 'react'
import apiInstance from '../../../services/api/apiInstance'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { FaUserAlt } from 'react-icons/fa'

const Navbar = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const [loggingOut, setLoggingOut] = useState(false)

    const handleLogout = async () => {
        setLoggingOut(true)
        try {
            await apiInstance.post('/logout')
            auth.employeeLogout()
            setLoggingOut(false)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="navbar fixed border-b-2 border-gray-600 bg-accent">
                <div className="navbar-start"></div>
                <div className="navbar-center">
                    <Link to="/home" className="btn btn-ghost text-xl">
                        Employee Manager(employee)
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
                                    alt="Employee profile pic"
                                    src={
                                        auth.employee?.profilePic ??
                                        'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png'
                                    }
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile">
                                    <FaUserAlt />
                                    Profile
                                </Link>
                            </li>
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

export default Navbar
