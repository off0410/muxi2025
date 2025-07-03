import React, { useState } from 'react';
import UnsavedChangesGuard from '../components/UnsavedChangesGuard';

const Settings = () => {
    const [formData, setFormData] = useState({
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        address: '北京市海淀区中关村大街1号',
        notification: true,
        newsletter: true,
    });

    const [initialData] = useState({ ...formData });
    const [hasChanges, setHasChanges] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        setHasChanges(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('设置已保存！');
        setHasChanges(false);
    };

    const handleReset = () => {
        setFormData({ ...initialData });
        setHasChanges(false);
    };

    return (
        <div>
            <UnsavedChangesGuard hasChanges={hasChanges} />

            <h2 className="text-2xl font-semibold mb-6">账户设置</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            姓名
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            邮箱
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="phone">
                            手机号
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="address">
                            收货地址
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">通知设置</h3>

                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="notification"
                                name="notification"
                                checked={formData.notification}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="notification" className="ml-2 text-gray-700">
                                接收订单通知
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="newsletter"
                                name="newsletter"
                                checked={formData.newsletter}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="newsletter" className="ml-2 text-gray-700">
                                订阅产品更新和促销信息
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={!hasChanges}
                        className={`px-4 py-2 rounded ${
                            hasChanges
                                ? 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        重置
                    </button>
                    <button
                        type="submit"
                        disabled={!hasChanges}
                        className={`px-6 py-2 rounded text-white ${
                            hasChanges
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-blue-400 cursor-not-allowed'
                        }`}
                    >
                        保存设置
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;