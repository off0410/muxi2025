import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // 模拟登录请求
        setTimeout(() => {
            if (username === 'admin' && password === 'password') {
                login({ name: '管理员', email: 'admin@example.com' });
                navigate(from, { replace: true });
            } else {
                setError('用户名或密码错误');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">用户登录</h1>

            {location.state?.message && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
                    <p>{location.state.message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-gray-700 mb-2">
                        用户名
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 mb-2">
                        密码
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? '登录中...' : '登录'}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    还没有账号？{' '}
                    <button
                        onClick={() => alert('注册功能暂未实现')}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        立即注册
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;