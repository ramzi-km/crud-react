/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useAuth } from './Auth'

const UserFetch = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const auth = useAuth()

    useEffect(() => {
        if (!auth.admin) {
            setTimeout(() => {
                auth.adminLogin({ name: 'admin' })
                setIsLoading(false)
            }, 5000)
        } else {
            setIsLoading(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return isLoading ? <p>Loading...</p> : children
}

export default UserFetch
