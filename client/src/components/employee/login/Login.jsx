import { useState } from 'react'
import { useAuth } from '../../../services/providers/Auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import apiInstance from '../../../services/api/apiInstance'

const Login = () => {
    const [errMessage, setErrMessage] = useState(null)
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/home'
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched',
    })
    const { errors, isValid, isSubmitting } = formState

    const onSubmit = async (data) => {
        try {
            const res = await apiInstance.post('/login', data)
            auth.employeeLogin(res.data.employee)
            navigate(redirectPath)
        } catch (error) {
            console.log(error)
            setErrMessage(
                error?.response?.data?.message || 'Unknown error occured'
            )
        }
    }
    return (
        <>
            <section className="bg-white">
                <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8">
                    <div className="w-full max-w-md rounded-lg border-4 border-gray-900 bg-base-200 shadow">
                        <div className="space-y-6 p-6">
                            <h1 className="text-center text-2xl font-bold text-gray-900">
                                Login as Employee
                            </h1>
                            {errMessage && (
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
                                    <span>{errMessage}</span>
                                    <button
                                        type="button"
                                        className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                                    >
                                        <i className="bx bx-x text-2xl"></i>
                                    </button>
                                </div>
                            )}
                            <form
                                className="space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Username
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@gmail.com"
                                        className="input input-bordered w-full border-2 border-black"
                                        {...register('email', {
                                            required: 'email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'invalid email',
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <div className="text-sm text-red-500">
                                            {errors.email.message}
                                        </div>
                                    )}
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
                                        {...register('password', {
                                            required: 'password is required',
                                            pattern: {
                                                value: /^[^\s]+$/,
                                                message:
                                                    'password must not contain spaces',
                                            },
                                            minLength: {
                                                value: 6,
                                                message:
                                                    'password will containt atleast 6 characters',
                                            },
                                        })}
                                    />
                                    {errors.password && (
                                        <div className="text-sm text-red-500">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-accent w-full text-black"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Login
                                    {isSubmitting && (
                                        <span className="loading loading-spinner loading-sm mb-1 ml-5"></span>
                                    )}
                                </button>
                                <div className="text-center">
                                    <Link
                                        to="/employeeMaster/login"
                                        className="text-sm text-blue-400 hover:underline"
                                    >
                                        login as employee master
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
