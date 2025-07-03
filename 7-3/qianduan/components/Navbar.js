import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold">
                        <Link to="/">图书商城</Link>
                    </div>

                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className={`hover:bg-blue-700 px-3 py-2 rounded ${location.pathname === '/' ? 'bg-blue-800' : ''}`}
                        >
                            首页
                        </Link>

                        <Link
                            to="/products"
                            className={`hover:bg-blue-700 px-3 py-2 rounded ${location.pathname.startsWith('/products') ? 'bg-blue-800' : ''}`}
                        >
                            商品列表
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/profile"
                                    className={`hover:bg-blue-700 px-3 py-2 rounded ${location.pathname.startsWith('/profile') ? 'bg-blue-800' : ''}`}
                                >
                                    用户中心
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">欢迎, {user?.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
                                    >
                                        退出
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className={`hover:bg-blue-700 px-3 py-2 rounded ${location.pathname === '/login' ? 'bg-blue-800' : ''}`}
                            >
                                登录
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;