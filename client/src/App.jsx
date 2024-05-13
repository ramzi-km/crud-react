import { Routes, Route } from 'react-router-dom'
import NoMatch from './components/no-match/NoMatch'
import EmployeeMasterLogin from './components/employeeMaster/login/EmployeeMasterLogin'
import Dashboard from './components/employeeMaster/dashboard/Dashboard'
import EmployeeMasterGuard from './utils/route-guards/EmployeeMasterGuard'
import { AuthProvider } from './services/providers/Auth'
import EmployeeMasterLoginGuard from './utils/route-guards/EmployeeMasterLoginGuard'
import NavbarEmployeeMaster from './components/employeeMaster/navbar/NavbarEmployeeMaster'
import { EmployeeManagement } from './components/employeeMaster/employeeManagement/EmployeeManagement'
import UserFetch from './utils/UserFetch'
import Navbar from './components/employee/navbar/Navbar'
import Login from './components/employee/login/Login'
import Home from './components/employee/home/Home'
import Profile from './components/employee/profile/Profile'

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
                            <Route path="profile" element={<Profile />} />
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
