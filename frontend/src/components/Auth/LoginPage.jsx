import { useState, useContext } from 'react';
import { login as loginRequest } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginRequest(email, password);
            const token = response.data.token;
            console.log("TOKEN NGA BACKEND:", token);
            const role = response.data.role;
            console.log("ROLE NGA BACKEND:", role);

            login(token, role);

            if (role === 'ROLE_ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (err) {
            const message =
                err.response?.data?.message || 'Identifikimi dështoi. Ju lutemi provoni më vonë.';
            setError(message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;