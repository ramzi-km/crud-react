import { Link } from 'react-router-dom'
import { useAuth } from '../../../services/providers/Auth'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { FaUserAlt } from 'react-icons/fa'

const Home = () => {
    const auth = useAuth()

    return (
        <>
            <div className="mt-36 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-semibold ">
                    Welcome
                    {' ' +
                        auth.employee?.firstName +
                        ' ' +
                        auth.employee?.lastName}
                </h1>
                <br />
                <div className="flex flex-col space-y-4">
                    <Link to="/profile" className="btn w-56">
                        Profile <FaUserAlt />
                    </Link>
                    <button
                        onClick={() =>
                            document.getElementById('logout-modal').showModal()
                        }
                        className="btn btn-error"
                    >
                        Logout <FaArrowRightFromBracket />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home
