import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UnsavedChangesGuard from '../components/UnsavedChangesGuard';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // 模拟从API获取产品数据
    const [product, setProduct] = useState({
        id,
        title: `图书 ${id}`,
        author: `作者 ${id}`,
        description: `这是一本关于React Router的图书。`,
        price: 89.99,
        stock: 15,
        category: '技术',
        publishDate: '2025-07-03',
        pages: 320,
        isbn: '978-7-121-12345-6'
    });

    const [quantity, setQuantity] = useState(1);
    const [hasChanges, setHasChanges] = useState(false);

    const handleAddToCart = () => {
        alert(`已添加 ${quantity} 本《${product.title}》到购物车`);
        setHasChanges(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <UnsavedChangesGuard hasChanges={hasChanges} />

            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
            >
                &larr; 返回商品列表
            </button>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-600 mb-4">作者: {product.author}</p>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
                                图书封面
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">图书描述</h2>
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-gray-600">类别: {product.category}</p>
                                    <p className="text-gray-600">出版日期: {product.publishDate}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">页数: {product.pages}页</p>
                                    <p className="text-gray-600">ISBN: {product.isbn}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">¥{product.price.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600">库存: {product.stock}本</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center border rounded">
                                        <button
                                            className="px-3 py-1 text-lg"
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1">{quantity}</span>
                                        <button
                                            className="px-3 py-1 text-lg"
                                            onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
                                    >
                                        加入购物车
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">相关图书</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map(id => (
                        <div key={id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h3 className="font-medium">相关图书 {id}</h3>
                            <p className="text-gray-600 text-sm mt-1">作者: 相关作者 {id}</p>
                            <p className="text-blue-600 font-medium mt-2">¥{Math.floor(Math.random() * 50) + 50}</p>
                            <Link
                                to={`/products/${id}`}
                                className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                查看详情 &rarr;
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;