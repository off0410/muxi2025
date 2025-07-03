import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">欢迎来到图书商城</h1>
            <p className="text-xl mb-8 text-gray-700">探索我们精选的图书收藏</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3">精选图书</h2>
                    <p className="mb-4">浏览我们精心挑选的图书收藏</p>
                    <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
                        查看图书 &rarr;
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3">热门推荐</h2>
                    <p className="mb-4">发现本月最受欢迎的图书</p>
                    <Link to="/products/1" className="text-blue-600 hover:text-blue-800 font-medium">
                        查看热门 &rarr;
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3">用户中心</h2>
                    <p className="mb-4">管理您的订单和个人设置</p>
                    <Link to="/profile" className="text-blue-600 hover:text-blue-800 font-medium">
                        前往用户中心 &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;