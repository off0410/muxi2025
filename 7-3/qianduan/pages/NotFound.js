import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="max-w-3xl mx-auto text-center py-16">
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-6">页面未找到</h2>
            <p className="text-lg text-gray-600 mb-8">
                抱歉，您访问的页面不存在或已被移除。
            </p>
            <div className="space-x-4">
                <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                    返回首页
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
                >
                    返回上一页
                </button>
            </div>
        </div>
    );
};

export default NotFound;