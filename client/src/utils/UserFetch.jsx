/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useAuth } from '../services/providers/Auth'
import Loading from '../components/shared/loading/Loading'
import apiInstance from '../services/api/apiInstance'

const UserFetch = ({ children }) => {
    const auth = useAuth()

    const [fetchingEmployeeMaster, setFetchingEmployeeMaster] = useState(true)
    const [fetchingEmployee, setFetchingEmployee] = useState(true)

    useEffect(() => {
        if (!auth.employeeMaster) {
            const fetchEmployeeMaster = async () => {
                try {
                    const res = await apiInstance.get('/employeeMaster')
                    await auth.employeeMasterLogin(res.data.employeeMaster)
                } catch (error) {
                    console.error(error)
                } finally {
                    setFetchingEmployeeMaster(false)
                }
            }
            fetchEmployeeMaster()
        } else {
            setFetchingEmployeeMaster(false)
        }
        if (!auth.employee) {
            const fetchEmployee = async () => {
                try {
                    const res = await apiInstance.get('/employee')
                    auth.employeeLogin(res.data.employee)
                } catch (error) {
                    console.error(error)
                } finally {
                    setFetchingEmployee(false)
                }
            }
            fetchEmployee()
        } else {
            setFetchingEmployee(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return fetchingEmployeeMaster || fetchingEmployee ? <Loading /> : children
}

export default UserFetch
