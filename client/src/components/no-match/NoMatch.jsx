import { Link } from 'react-router-dom'

const NoMatch = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center space-y-4">
            <h1 className="text-5xl font-semibold text-accent">
                Page not found
            </h1>
            <Link to="/home" className=" underline hover:text-blue-600">
                Back to home
            </Link>
        </div>
    )
}

export default NoMatch
