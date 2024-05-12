import { MdEdit } from 'react-icons/md'
import { FaTrashCan } from 'react-icons/fa6'
import { MdAdd } from 'react-icons/md'
import AddEmpModal from './addEmpModal/AddEmpModal'

export const EmployeeManagement = () => {
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
                        >
                            <option>Accounts and finance</option>
                            <option>Human resources</option>
                            <option>UX/UI</option>
                            <option>Software development</option>
                            <option>Sales and marketing</option>
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
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                Hart Hagerty
                                            </div>
                                            <div className="text-sm opacity-50">
                                                United States
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        Desktop Support Technician
                                    </span>
                                </td>
                                <td>Purple</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">
                                        details
                                    </button>
                                </th>
                                <th>
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="btn btn-outline btn-primary btn-xs flex items-center justify-center">
                                            <MdEdit size={15} />
                                        </button>
                                        <button className="btn btn-outline btn-error btn-xs flex items-center justify-center">
                                            <FaTrashCan size={15} />
                                        </button>
                                    </div>
                                </th>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/tailwind-css-component-profile-3@56w.png"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                Brice Swyre
                                            </div>
                                            <div className="text-sm opacity-50">
                                                China
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Carroll Group
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        Tax Accountant
                                    </span>
                                </td>
                                <td>Red</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">
                                        details
                                    </button>
                                </th>
                                <th>
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="btn btn-outline btn-primary btn-xs flex items-center justify-center">
                                            <MdEdit size={15} />
                                        </button>
                                        <button className="btn btn-outline btn-error btn-xs flex items-center justify-center">
                                            <FaTrashCan size={15} />
                                        </button>
                                    </div>
                                </th>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/tailwind-css-component-profile-4@56w.png"
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                Marjy Ferencz
                                            </div>
                                            <div className="text-sm opacity-50">
                                                Russia
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Rowe-Schoen
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        Office Assistant I
                                    </span>
                                </td>
                                <td>Crimson</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">
                                        details
                                    </button>
                                </th>
                                <th>
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="btn btn-outline btn-primary btn-xs flex items-center justify-center">
                                            <MdEdit size={15} />
                                        </button>
                                        <button className="btn btn-outline btn-error btn-xs flex items-center justify-center">
                                            <FaTrashCan size={15} />
                                        </button>
                                    </div>
                                </th>
                            </tr>
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
            <AddEmpModal />
        </>
    )
}
