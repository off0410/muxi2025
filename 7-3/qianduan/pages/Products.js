import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products] = useState([
        { id: 1, title: 'React编程之道', author: '张三', price: 89.99, stock: 15 },
        { id: 2, title: '深入理解JavaScript', author: '李四', price: 79.99, stock: 8 },
        { id: 3, title: 'Node.js实战', author: '王五', price: 99.99, stock: 22 },
        { id: 4, title: 'CSS权威指南', author: '赵六', price: 69.99, stock: 5 },
        { id: 5, title: 'Python数据科学', author: '钱七', price: 109.99, stock: 12 },
        { id: 6, title: '算法图解', author: '孙八', price: 59.99, stock: 18 },
    ]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">图书列表</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                            <p className="text-gray-600 mb-1">作者: {product.author}</p>
                            <p className="text-gray-600 mb-3">库存: {product.stock}本</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-blue-600">¥{product.price.toFixed(2)}</span>
                                <Link
                                    to={`/products/${product.id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                                >
                                    查看详情
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;