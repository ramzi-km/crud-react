/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import apiInstance from '../../../../services/api/apiInstance'
import { FaTrashCan } from 'react-icons/fa6'

const DeleteEmpModal = ({ employee, sentDeletedEmpId }) => {
    const [deletingEmp, setDeletingEmp] = useState(false)

    const handleDeleteEmp = async () => {
        setDeletingEmp(true)
        try {
            await apiInstance.delete(`/employeeMaster/employees/${employee.id}`)
            setDeletingEmp(false)
            sentDeletedEmpId(employee.id)
            document.getElementById('deleteEmp-modal').close()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <dialog id="deleteEmp-modal" className="modal">
            <div className="modal-box w-5/6 max-w-sm bg-white p-4 md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative flex flex-col items-center p-4 text-center sm:p-5">
                    <FaTrashCan size={50} className="mb-4" />
                    <p className="text-textp mb-4">
                        Are you sure you want to remove{' '}
                        {employee.firstName + ' ' + employee.lastName}?
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                        <button
                            type="button"
                            className="btn-black btn btn-outline btn-sm"
                            onClick={() =>
                                document
                                    .getElementById('deleteEmp-modal')
                                    .close()
                            }
                        >
                            No, cancel
                        </button>
                        <button
                            disabled={deletingEmp}
                            type="button"
                            className="btn btn-error btn-sm bg-red-600 text-white"
                            onClick={handleDeleteEmp}
                        >
                            Yes, I'm sure
                            {deletingEmp && (
                                <span className="loading loading-spinner loading-sm ml-2 text-white"></span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteEmpModal
