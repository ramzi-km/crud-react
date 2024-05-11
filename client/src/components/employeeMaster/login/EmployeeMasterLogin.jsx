import { useState } from 'react'
import { useAuth } from '../../../utils/Auth'
import { useLocation, useNavigate } from 'react-router-dom'

const EmployeeMasterLogin = () => {
    const [employeeMaster, setemployeeMaster] = useState(null)
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/employeeMaster/dashboard'

    const handleLogin = () => {
        auth.employeeMasterLogin({ name: employeeMaster })
        navigate(redirectPath)
    }
    return (
        // <div>
        //     <label>
        //         Username:{''}
        //         <input
        //             classNameName="input input-bordered"
        //             type="text"
        //             onChange={(e) => setemployeeMaster(e.target.value)}
        //         />
        //     </label>
        //     <button onClick={handleLogin} classNameName="btn btn-primary">
        //         Login
        //     </button>
        // </div>
        <>
            <section className="bg-white">
                <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8">
                    <div className="w-full max-w-md rounded-lg border-4 border-gray-900 bg-base-200 shadow">
                        <div className="space-y-6 p-6">
                            <h1 className="text-center text-2xl font-bold text-gray-900">
                                Log into Employee Master
                            </h1>
                            <div className="alert alert-error relative my-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <span>errMessage</span>
                                <button
                                    type="button"
                                    className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                                >
                                    <i className="bx bx-x text-2xl"></i>
                                </button>
                            </div>
                            <form className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Username
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@gmail.com"
                                        className="input input-bordered w-full border-2 border-black"
                                    />
                                    <div className="text-sm text-red-500">
                                        <label>email is required</label>
                                        <label>not a valid email</label>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="********"
                                        className="input input-bordered w-full border-2 border-black"
                                    />
                                    <div className="text-sm text-red-500">
                                        <label>password is required</label>
                                        <label>
                                            password will not contain spaces
                                        </label>
                                        <label>
                                            password will contain atleast 6
                                            characters
                                        </label>
                                        <label>
                                            password will contain a number and a
                                            character
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-accent w-full text-black">
                                    Login
                                    <span className="text-textp loading loading-spinner loading-sm mb-1 ml-5"></span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmployeeMasterLogin
