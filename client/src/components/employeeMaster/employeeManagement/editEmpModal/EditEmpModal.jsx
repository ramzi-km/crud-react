/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import apiInstance from '../../../../services/api/apiInstance'
import { GiCrossMark } from 'react-icons/gi'

const EditEmpModal = ({ sentUpdatedEmployee, employee }) => {
    const [errMessage, setErrMessage] = useState(null)

    const { register, handleSubmit, formState, reset, getValues } = useForm({
        values: employee,
        mode: 'onTouched',
    })
    const { errors, isValid, isSubmitting } = formState

    const onEditEmpFormSubmit = async (data) => {
        try {
            if (!areFormValuesChanged()) {
                return
            }
            const res = await apiInstance.patch(
                `/employeeMaster/employees/${employee.id}`,
                data
            )
            sentUpdatedEmployee(res.data.updatedEmployee)
            closeEditEmpModal()
        } catch (error) {
            console.log(error)
            setErrMessage(
                error?.response?.data?.message || 'unknown error occured'
            )
        }
    }

    const closeEditEmpModal = () => {
        setErrMessage('')
        reset()
        document.getElementById('editEmp-modal').close()
    }

    const [initialFormValues, setInitialFormValues] = useState({})

    useEffect(() => {
        setInitialFormValues(employee)
    }, [employee])

    // Function to compare current form values with initial values
    const areFormValuesChanged = () => {
        return JSON.stringify(getValues()) !== JSON.stringify(initialFormValues)
    }

    return (
        <dialog id="editEmp-modal" className="modal">
            <form
                className="text-textp modal-box max-w-max bg-base-300"
                onSubmit={handleSubmit(onEditEmpFormSubmit)}
                noValidate
            >
                <div className="my-4 text-center text-2xl font-semibold">
                    <p>Update Employee</p>
                </div>
                <button
                    onClick={closeEditEmpModal}
                    type="button"
                    className="btn btn-circle btn-ghost btn-sm absolute right-4 top-4 text-2xl"
                >
                    <GiCrossMark />
                </button>
                {errMessage && (
                    <div className="alert alert-error mt-3 flex h-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{errMessage}</span>
                    </div>
                )}

                <div className="flex flex-col md:flex-row md:space-x-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="eg:John"
                            className="input input-bordered"
                            {...register('firstName', {
                                required: 'First name is required',
                                maxLength: {
                                    value: 20,
                                    message: 'Should not exceed 20 characters',
                                },
                                validate: {
                                    minLen: (value) =>
                                        value.trim().length >= 2 ||
                                        'First name will be atleast 2 characters',
                                },
                            })}
                        />
                        {errors.firstName && (
                            <div className="ml-3 mt-1 text-sm text-red-500">
                                {errors.firstName.message}
                            </div>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g:Doe"
                            className="input input-bordered"
                            {...register('lastName', {
                                required: 'Last name is required',
                                maxLength: {
                                    value: 20,
                                    message: 'Should not exceed 20 characters',
                                },
                                validate: {
                                    minLen: (value) =>
                                        value.trim().length >= 2 ||
                                        'Last name will be atleast 2 characters',
                                },
                            })}
                        />
                        {errors.lastName && (
                            <div className="ml-3 mt-1 text-sm text-red-500">
                                {errors.lastName.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email id</span>
                    </label>
                    <input
                        type="email"
                        placeholder="eg:john@gmail.com"
                        className="input input-bordered"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email',
                            },
                        })}
                    />
                    {errors.email && (
                        <div className="ml-3 mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Department</span>
                    </label>
                    <select
                        className="select select-bordered"
                        {...register('department', {
                            required: 'Department is required',
                        })}
                        defaultValue={''}
                    >
                        <option disabled value="">
                            Department
                        </option>
                        <option value="accounts">Account & finance</option>
                        <option value="hr">Human resources</option>
                        <option value="ui">UI/UX</option>
                        <option value="dev">Software development</option>
                        <option value="sales">Sales and marketing</option>
                    </select>
                    {errors.department && (
                        <div className="ml-3 mt-1 text-sm text-red-500">
                            {errors.department.message}
                        </div>
                    )}
                </div>
                <div className="flex flex-col md:flex-row md:space-x-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Employee code</span>
                        </label>
                        <input
                            type="text"
                            placeholder="eg: emp124"
                            className="input input-bordered"
                            {...register('empCode', {
                                required: 'Employee code is required',
                                pattern: {
                                    value: /^emp\d{3}$/,
                                    message:
                                        'Employee code must start with "emp" followed by three digits',
                                },
                            })}
                        />
                        {errors.empCode && (
                            <div className="ml-3 mt-1 max-w-56 text-sm text-red-500">
                                {errors.empCode.message}
                            </div>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contact No</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="+91 :"
                            className="input input-bordered"
                            {...register('contact', {
                                required: 'Contact no is required',
                                pattern: {
                                    value: /^\d{10}$/,
                                    message:
                                        'Contact must be a 10-digit number',
                                },
                            })}
                        />
                        {errors.contact && (
                            <div className="ml-3 mt-1 text-sm text-red-500">
                                {errors.contact.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-control mt-6">
                    <button
                        type="submit"
                        className="btn btn-accent text-black"
                        disabled={!isValid || isSubmitting}
                    >
                        Submit
                        {isSubmitting && (
                            <span className="loading loading-spinner loading-sm mb-1 ml-5"></span>
                        )}
                    </button>
                </div>
            </form>
        </dialog>
    )
}

export default EditEmpModal
