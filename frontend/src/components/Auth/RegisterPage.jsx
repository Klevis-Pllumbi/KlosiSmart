import { useState, useContext } from 'react';
import { register as registerRequest } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const { login } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await registerRequest(name, email, password);
            const token = response.data.token;
            const role = response.data.role;

            login(token, role);

            if (role === 'ROLE_ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (err) {
            const message =
                err.response?.data?.message || 'Regjistrimi dështoi. Ju lutemi provoni më vonë.';
            setError(message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
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
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterPage;