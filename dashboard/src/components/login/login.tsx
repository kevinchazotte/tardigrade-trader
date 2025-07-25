import { useState } from 'react';
import { useAuth } from '../../context/AuthenticationContext';
import { postUser } from '../../services/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await postUser(username, email, password);
            if (data.token) {
                setToken(data.token);
                alert('Login successful!');
            }
        } catch (error) {
            console.error('Login failed: ', error);
            alert(`Login failed: ${(error as Error).message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h5>Login</h5>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
            <input type="submit" value="Login" />
        </form>
    );
};

export default Login;
