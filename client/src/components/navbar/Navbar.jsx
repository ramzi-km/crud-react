import { Outlet } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <h1 className="text-4xl">Navbar works</h1>
            <Outlet /> 
        </>
    )
}

export default Navbar
