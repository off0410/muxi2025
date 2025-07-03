import React from 'react';

const Orders = () => {
    const orders = [
        { id: 'ORD20230715001', date: '2023-07-15', amount: 189.98, status: '已发货' },
        { id: 'ORD20230710002', date: '2023-07-10', amount: 79.99, status: '已完成' },
        { id: 'ORD20230705003', date: '2023-07-05', amount: 299.97, status: '处理中' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">我的订单</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 text-left">订单号</th>
                        <th className="py-3 px-4 text-left">日期</th>
                        <th className="py-3 px-4 text-left">金额</th>
                        <th className="py-3 px-4 text-left">状态</th>
                        <th className="py-3 px-4 text-left">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                            <td className="py-3 px-4 border-b">{order.id}</td>
                            <td className="py-3 px-4 border-b">{order.date}</td>
                            <td className="py-3 px-4 border-b">¥{order.amount.toFixed(2)}</td>
                            <td className="py-3 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-xs ${
                      order.status === '已发货' ? 'bg-green-100 text-green-800' :
                          order.status === '已完成' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                            </td>
                            <td className="py-3 px-4 border-b">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                    查看详情
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-5xl mb-4">📦</div>
                    <p className="text-gray-600 mb-4">您还没有任何订单</p>
                    <a href="/7-3/qianduan/pages/Products" className="text-blue-600 hover:text-blue-800">
                        去逛逛 &rarr;
                    </a>
                </div>
            )}
        </div>
    );
};

export default Orders;