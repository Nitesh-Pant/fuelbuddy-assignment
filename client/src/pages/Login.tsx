// src/pages/Login.tsx
import { useState } from 'react';
import { login, getToken } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            const token = await getToken();
            if (token) {
                localStorage.setItem('authToken', token);  
            }
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">

                <h2 className="text-2xl font-bold text-center">Login</h2>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
            </form>
        </div>
    );
}
