import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store";
import { CartItem } from "../../types/Cart.type";
import { PaginatedList } from "../../components/PaginatedList";
import { PaginationResult } from "../../types/PaginationResult.type";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const fetchCartData = useCallback(
        async ({
            page,
            size,
        }: {
            page: number;
            size: number;
        }): Promise<PaginationResult<CartItem>> => {
            // TODO: Implement actual API call
            return {
                content: cartItems,
                itemAmount: cartItems.length,
                pageSize: size,
                pageCount: Math.ceil(cartItems.length / size),
                currentPage: page,
            };
        },
        [cartItems]
    );

    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(
            cartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (itemId: string) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2">
                    <PaginatedList<CartItem>
                        fetchData={fetchCartData}
                        renderItem={(item) => (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div className="ml-4 flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        <p className="text-lg font-bold text-indigo-600 mt-2">
                                            {item.price.toLocaleString('vi-VN')}đ
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center border rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                            >
                                                <FiMinus />
                                            </button>
                                            <span className="px-4 py-1">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                            >
                                                <FiPlus />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        pageSize={5}
                    />
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Tổng đơn hàng</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tạm tính</span>
                                <span className="font-semibold">
                                    {calculateTotal().toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phí vận chuyển</span>
                                <span className="font-semibold">Miễn phí</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold">Tổng cộng</span>
                                    <span className="text-lg font-bold text-indigo-600">
                                        {calculateTotal().toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                            </div>
                            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center">
                                <FiShoppingBag className="mr-2" />
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart; 