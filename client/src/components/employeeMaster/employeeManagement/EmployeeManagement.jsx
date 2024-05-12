/* eslint-disable react-hooks/exhaustive-deps */
import { MdEdit } from 'react-icons/md'
import { FaTrashCan } from 'react-icons/fa6'
import { MdAdd } from 'react-icons/md'
import AddEmpModal from './addEmpModal/AddEmpModal'
import { useEffect, useState } from 'react'
import apiInstance from '../../../services/api/apiInstance'
import Loading from '../../shared/loading/Loading'
import { useLocation, useSearchParams } from 'react-router-dom'
import EditEmpModal from './editEmpModal/EditEmpModal'
import DeleteEmpModal from './deleteEmpModal/DeleteEmpModal'

export const EmployeeManagement = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const [employees, setEmployees] = useState([])
    const [editingEmployee, setEditingEmployee] = useState([])
    const [deletingEmployee, setDeletingEmployee] = useState([])
    const [fetchingEmployees, setFetchingEmployees] = useState()
    const [filter, setFilter] = useState(queryParams.get('filter') ?? '')

    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setFetchingEmployees(true)
        setSearchParams({ filter })
        const fetchEmployees = async () => {
            try {
                const res = await apiInstance.get('/employeeMaster/employees', {
                    params: {
                        filter,
                    },
                })
                setEmployees(res.data.employees)
            } catch (error) {
                console.error(error)
            } finally {
                setFetchingEmployees(false)
            }
        }
        fetchEmployees()
    }, [filter])

    const transformDepartment = (department) => {
        switch (department) {
            case 'accounts':
                return 'Accounts & finance'
            case 'ui':
                return 'UI/UX'
            case 'dev':
                return 'Software development'
            case 'hr':
                return 'Human resources'
            case 'sales':
                return 'Sales & marketing'
            default:
                return 'Human resources'
        }
    }
    const handleNewEmployee = (newEmployee) => {
        if (filter == '' || filter == newEmployee.department) {
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee])
        }
    }
    const handleUpdatedEmployee = (updatedEmployee) => {
        if (filter == '' || filter == updatedEmployee.department) {
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) => {
                    return employee.id == updatedEmployee.id
                        ? updatedEmployee
                        : employee
                })
            )
        } else {
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => {
                    return employee.id !== updatedEmployee.id
                })
            )
        }
    }
    const handleDeletedEmployee = (empId) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => {
                return employee.id !== empId
            })
        )
    }

    return (
        <>
            <h1 className="mt-10 text-center text-2xl font-semibold">
                Employee Management
            </h1>
            <section className="container mx-auto px-44 py-5">
                <button
                    onClick={() =>
                        document
                            .getElementById('createEmployee-modal')
                            .showModal()
                    }
                    className="btn ml-auto bg-green-500"
                >
                    <MdAdd size={18} /> Add Employee
                </button>
                <div className="mb-2 flex w-full justify-end">
                    <div className="flex flex-col items-center sm:flex-row">
                        <span className="mr-2 sm:font-medium">Department:</span>
                        <select
                            id="sort"
                            className=" text-textp block rounded-lg border border-gray-300 bg-base-200  p-1 text-sm focus:border-blue-500 focus:ring-blue-500 md:p-2.5"
                            defaultValue={filter}
                            onChange={(e) => {
                                setFilter(e.target.value)
                            }}
                        >
                            <option value="">All</option>
                            <option value="accounts">
                                Accounts and finance
                            </option>
                            <option value="hr">Human resources</option>
                            <option value="ui">UX/UI</option>
                            <option value="dev">Software development</option>
                            <option value="sales">Sales and marketing</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className="bg-black text-sm text-white">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchingEmployees ? (
                                <tr className="h-40">
                                    <td colSpan="6" className="relative">
                                        <Loading size="50" />
                                    </td>
                                </tr>
                            ) : employees[0] ? (
                                employees.map((employee, index) => (
                                    <tr key={employee.id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={
                                                                employee.profilePic
                                                            }
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {employee.firstName +
                                                            ' ' +
                                                            employee.lastName}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        {employee.empCode}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {transformDepartment(
                                                employee.department
                                            )}
                                        </td>
                                        <td>{employee.email}</td>
                                        <th>{employee.contact}</th>
                                        <th>
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingEmployee(
                                                            employee
                                                        )
                                                        document
                                                            .getElementById(
                                                                'editEmp-modal'
                                                            )
                                                            .showModal()
                                                    }}
                                                    className="btn btn-outline btn-primary btn-xs flex items-center justify-center"
                                                >
                                                    <MdEdit size={15} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDeletingEmployee(
                                                            employee
                                                        )
                                                        document
                                                            .getElementById(
                                                                'deleteEmp-modal'
                                                            )
                                                            .showModal()
                                                    }}
                                                    className="btn btn-outline btn-error btn-xs flex items-center justify-center"
                                                >
                                                    <FaTrashCan size={15} />
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="h-20 text-center text-xl font-semibold"
                                    >
                                        No employees to show
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        {/* foot */}
                        <tfoot className="bg-gray-300 text-sm">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>

            {/* add employee modal */}
            <AddEmpModal sentNewEmployee={handleNewEmployee} />
            {/* edit employee modal */}
            <EditEmpModal
                sentUpdatedEmployee={handleUpdatedEmployee}
                employee={editingEmployee}
            />
            {/* delete employee modal */}
            <DeleteEmpModal
                employee={deletingEmployee}
                sentDeletedEmpId={handleDeletedEmployee}
            />
        </>
    )
}
