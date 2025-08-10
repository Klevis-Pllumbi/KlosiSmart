import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import PrivateRoute from './routes/PrivateRoute';
import RoleBasedRoute from './routes/RoleBasedRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/admin/dashboard"
                        element={
                            <RoleBasedRoute allowedRole="ROLE_ADMIN">
                                <AdminDashboard />
                            </RoleBasedRoute>
                        }
                    />

                    <Route
                        path="/user/dashboard"
                        element={
                            <RoleBasedRoute allowedRole="ROLE_USER">
                                <UserDashboard />
                            </RoleBasedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
