import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/profile', label: '个人主页', exact: true },
        { path: '/profile/orders', label: '我的订单' },
        { path: '/profile/settings', label: '账户设置' },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">用户中心</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center text-gray-500 mb-4">
                                头像
                            </div>
                            <h2 className="text-xl font-semibold">用户名</h2>
                            <p className="text-gray-600">会员等级: 黄金会员</p>
                        </div>

                        <nav>
                            <ul className="space-y-2">
                                {menuItems.map(item => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className={`block px-4 py-2 rounded transition-colors ${
                                                (item.exact && location.pathname === item.path) ||
                                                (!item.exact && location.pathname.startsWith(item.path))
                                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                                    : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="w-full md:w-3/4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;