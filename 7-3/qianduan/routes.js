import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AuthGuard from './components/AuthGuard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* 用户中心 - 使用嵌套路由 */}
            <Route path="/profile" element={
                <AuthGuard>
                    <Profile />
                </AuthGuard>
            }>
                <Route index element={<div>请选择子页面</div>} />
                <Route path="orders" element={<Orders />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;