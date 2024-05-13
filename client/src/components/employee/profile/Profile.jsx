import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../services/providers/Auth'
import apiInstance from '../../../services/api/apiInstance'
import { MdEdit, MdOutlineErrorOutline } from 'react-icons/md'
import { FaRegCheckCircle } from 'react-icons/fa'
import fileTypeChecker from 'file-type-checker'
import Loading from '../../shared/loading/Loading'

const Profile = () => {
    const [errMessage, setErrMessage] = useState(null)
    const [updateSuccessful, setUpdateSuccessful] = useState(false)
    const auth = useAuth()

    const { register, handleSubmit, formState, reset, getValues } = useForm({
        values: auth.employee,
        mode: 'onTouched',
    })

    const { errors, isValid, isSubmitting } = formState

    const onEditEmpFormSubmit = async (data) => {
        try {
            if (!areFormValuesChanged()) {
                return
            }
            const res = await apiInstance.patch(`/employee`, data)
            auth.employeeLogin(res.data?.updatedEmployee)
            setErrMessage('')
            setUpdateSuccessful(true)
            setTimeout(() => {
                setUpdateSuccessful(false)
            }, 3000)
        } catch (error) {
            console.log(error)
            setErrMessage(
                error?.response?.data?.message || 'unknown error occured'
            )
        }
    }

    const [initialFormValues, setInitialFormValues] = useState({})

    useEffect(() => {
        setInitialFormValues(auth.employee)
    }, [auth.employee])

    // Function to compare current form values with initial values
    const areFormValuesChanged = () => {
        return JSON.stringify(getValues()) !== JSON.stringify(initialFormValues)
    }

    const hiddenFileInput = useRef(null)
    const [fileUploadErr, setFileUploadErr] = useState('')
    const [fileUploading, setFileUploading] = useState(false)

    const handleProfileEditClick = () => {
        if (fileUploading) {
            return
        }
        hiddenFileInput.current.click()
    }

    const handleFileChange = (event) => {
        try {
            const file = event.target.files[0]
            const reader = new FileReader()
            const types = ['jpeg', 'png', 'gif']

            reader.onload = async () => {
                try {
                    setFileUploading(true)

                    const isImage = fileTypeChecker.validateFileType(
                        reader.result,
                        types
                    )
                    if (isImage) {
                        setFileUploadErr('')
                        const formData = new FormData()
                        formData.append('image', file)
                        const axiosConfig = {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }

                        const res = await apiInstance.post(
                            'employee/profilePic',
                            formData,
                            axiosConfig
                        )
                        auth.employeeLogin(res.data?.updatedEmployee)
                        console.log(res)
                    } else {
                        setFileUploadErr(
                            'Only .png, .jpg and .jpeg format allowed!'
                        )
                    }
                } catch (error) {
                    setFileUploadErr(error.response?.data?.message)
                } finally {
                    setFileUploading(false)
                }
            }

            reader.readAsArrayBuffer(file)
        } catch (err) {
            console.error('Error: ', err.message)
        }
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-5 bg-white md:flex-row">
            <main className=" mt-24 flex w-full items-center justify-center py-1">
                <div className="">
                    <div className=" w-full sm:max-w-xl sm:rounded-lg">
                        <h2 className="text-2xl font-semibold sm:text-3xl">
                            Profile
                        </h2>

                        <div className="mx-auto mt-2 grid max-w-2xl">
                            <div className=" flex flex-col items-center justify-center space-y-5 sm:flex-row sm:space-y-0">
                                <div className="relative h-36 w-36 rounded-full">
                                    <img
                                        className="h-36 w-36 rounded-full object-cover p-1 ring-2 ring-accent"
                                        src={auth.employee?.profilePic}
                                        alt="Bordered profile pic"
                                    />
                                    <button
                                        className="btn btn-circle btn-info btn-sm absolute right-0 top-2"
                                        onClick={handleProfileEditClick}
                                    >
                                        <MdEdit size={20} />
                                    </button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className=" hidden"
                                        onChange={handleFileChange}
                                        ref={hiddenFileInput}
                                        multiple={false}
                                    />
                                    {fileUploading && (
                                        <Loading
                                            round="rounded-full"
                                            size="30"
                                            stroke="4.5"
                                        />
                                    )}
                                </div>
                                {fileUploadErr && (
                                    <div className="ml-3 mt-1 text-sm text-red-500">
                                        {fileUploadErr}
                                    </div>
                                )}
                            </div>

                            {errMessage && (
                                <div className="alert alert-error mt-3 flex h-10">
                                    <MdOutlineErrorOutline size={24} />
                                    <span>{errMessage}</span>
                                </div>
                            )}
                            {updateSuccessful && (
                                <div className="alert alert-success mt-3 flex h-10 text-white">
                                    <FaRegCheckCircle size={20} />
                                    <span>Updated successfully</span>
                                </div>
                            )}
                            <form
                                className="mb-12 mt-4 items-center"
                                onSubmit={handleSubmit(onEditEmpFormSubmit)}
                            >
                                <div className="flex w-full flex-col items-center space-x-0 space-y-2  sm:flex-row sm:space-x-4 sm:space-y-0">
                                    <div className="w-full">
                                        <label
                                            htmlFor="first_name"
                                            className=" block text-sm font-medium text-accent"
                                        >
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            className="block w-full rounded-lg border border-teal-300 bg-teal-50 p-2.5 text-sm text-black"
                                            placeholder="Your first name"
                                            {...register('firstName', {
                                                required:
                                                    'First name is required',
                                                maxLength: {
                                                    value: 20,
                                                    message:
                                                        'Should not exceed 20 characters',
                                                },
                                                validate: {
                                                    minLen: (value) =>
                                                        value.trim().length >=
                                                            2 ||
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

                                    <div className="w-full">
                                        <label
                                            htmlFor="last_name"
                                            className=" block text-sm font-medium text-accent "
                                        >
                                            Your last name
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            className="block w-full rounded-lg border border-teal-300 bg-teal-50 p-2.5 text-sm text-black focus:border-teal-500 focus:ring-teal-500"
                                            placeholder="Your last name"
                                            {...register('lastName', {
                                                required:
                                                    'Last name is required',
                                                maxLength: {
                                                    value: 20,
                                                    message:
                                                        'Should not exceed 20 characters',
                                                },
                                                validate: {
                                                    minLen: (value) =>
                                                        value.trim().length >=
                                                            2 ||
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

                                <div className="">
                                    <label
                                        htmlFor="email"
                                        className="mt-4 block text-sm font-medium text-accent "
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full rounded-lg border border-teal-300 bg-teal-50 p-2.5 text-sm text-black focus:border-teal-500 focus:ring-teal-500 "
                                        placeholder="your.email@mail.com"
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
                                <div className="">
                                    <label
                                        htmlFor="department"
                                        className="mt-4 block text-sm font-medium text-accent "
                                    >
                                        Department
                                    </label>
                                    <select
                                        className="block w-full rounded-lg border border-teal-300 bg-teal-50 p-2.5 text-sm text-black focus:border-teal-500 focus:ring-teal-500"
                                        {...register('department', {
                                            required: 'Department is required',
                                        })}
                                    >
                                        <option disabled value="">
                                            Department
                                        </option>
                                        <option value="accounts">
                                            Account & finance
                                        </option>
                                        <option value="hr">
                                            Human resources
                                        </option>
                                        <option value="ui">UI/UX</option>
                                        <option value="dev">
                                            Software development
                                        </option>
                                        <option value="sales">
                                            Sales and marketing
                                        </option>
                                    </select>
                                </div>
                                <div className="mt-4 flex w-full flex-col items-center space-x-0  space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                                    <div className="w-full">
                                        <label
                                            htmlFor="empCode"
                                            className=" block text-sm font-medium text-accent"
                                        >
                                            Employee code
                                        </label>
                                        <input
                                            type="text"
                                            id="empCode"
                                            className=" input-disabled block w-full rounded-lg border border-teal-300 bg-teal-50 p-2.5 text-sm text-black"
                                            placeholder="emp123"
                                            {...register('empCode', {
                                                required:
                                                    'Employee code is required',
                                                pattern: {
                                                    value: /^emp\d{3}$/,
                                                    message:
                                                        'Employee code must start with "emp" followed by three digits',
                                                },
                                            })}
                                            disabled
                                        />
                                        {errors.empCode && (
                                            <div className="ml-3 mt-1 max-w-56 text-sm text-red-500">
                                                {errors.empCode.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full">
                                        <label
                                            htmlFor="contact"
                                            className=" block text-sm font-medium text-accent "
                                        >
                                            Contact no
                                        </label>
                                        <input
                                            type="tel"
                                            id="contact"
                                            className="block w-full rounded-lg border border-teal-300 bg-teal-50 p-2.5 text-sm text-black focus:border-teal-500 focus:ring-teal-500"
                                            placeholder="+91"
                                            {...register('contact', {
                                                required:
                                                    'Contact no is required',
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

                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline btn-warning btn-sm"
                                        onClick={() => {
                                            reset(auth.employee)
                                        }}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-accent btn-sm"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Save
                                        {isSubmitting && (
                                            <span className="loading loading-spinner loading-sm mb-1 ml-5"></span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile
