import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import NoMatch from './components/no-match/NoMatch'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import EmployeeMasterLogin from './components/employeeMaster/login/EmployeeMasterLogin'
import Dashboard from './components/employeeMaster/dashboard/Dashboard'
import EmployeeMasterGuard from './utils/EmployeeMasterGuard'
import { AuthProvider } from './utils/Auth'
import EmployeeMasterLoginGuard from './utils/EmployeeMasterLoginGuard'
import NavbarEmployeeMaster from './components/employeeMaster/navbar/NavbarEmployeeMaster'
import { EmployeeManagement } from './components/employeeMaster/employeeManagement/EmployeeManagement'
import UserFetch from './utils/UserFetch'

function App() {
    return (
        <>
            <AuthProvider>
                <UserFetch>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Navbar />}>
                            <Route index element={<Home />} />
                            <Route path="home" element={<Home />} />
                        </Route>

                        <Route element={<EmployeeMasterLoginGuard />}>
                            <Route
                                path="/employeeMaster/login"
                                element={<EmployeeMasterLogin />}
                            />
                        </Route>
                        <Route element={<EmployeeMasterGuard />}>
                            <Route
                                path="/employeeMaster"
                                element={<NavbarEmployeeMaster />}
                            >
                                <Route index element={<Dashboard />} />
                                <Route
                                    path="dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="employeeManagement"
                                    element={<EmployeeManagement />}
                                />
                            </Route>
                        </Route>

                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </UserFetch>
            </AuthProvider>
        </>
    )
}

export default App
