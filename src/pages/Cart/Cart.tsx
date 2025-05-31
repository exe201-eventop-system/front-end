import { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../features/store";
import { CartItem } from "../../types/Cart.type";
import { PaginatedList } from "../../components/PaginatedList";
import { PaginationResult } from "../../types/PaginationResult.type";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";

const mockCart: CartItem[] = [
    {
        id: "1",
        productId: "p1",
        name: "Bó hoa cưới sang trọng",
        description: "Bó hoa tươi cao cấp cho ngày trọng đại.",
        category: "Hoa tươi",
        price: 500000,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: "2",
        productId: "p2",
        name: "Bánh kem 3 tầng",
        description: "Bánh kem ngọt ngào, trang trí đẹp mắt cho tiệc cưới.",
        category: "Bánh ngọt",
        price: 1200000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: "3",
        productId: "p3",
        name: "Dịch vụ chụp ảnh",
        description: "Gói chụp ảnh chuyên nghiệp lưu giữ khoảnh khắc.",
        category: "Media",
        price: 2000000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80"
    }
];

const Cart = () => {
 //   const dispatch = useDispatch<AppDispatch>();
    const [cartItems, setCartItems] = useState<CartItem[]>(mockCart);

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
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2">
                    <PaginatedList<CartItem>
                        fetchData={fetchCartData}
                        renderItem={(item) => (
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center gap-6 hover:shadow-xl transition">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-28 h-28 object-cover rounded-xl border"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-400">{item.category}</p>
                                    <p className="text-lg font-bold text-indigo-600 mt-2">
                                        {item.price.toLocaleString('vi-VN')}đ
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-indigo-100 transition"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="mx-3 text-lg font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-indigo-100 transition"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-200 text-red-500 transition"
                                        title="Xóa sản phẩm"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                        pageSize={5}
                    />
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tổng đơn hàng</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tạm tính</span>
                                <span className="font-semibold">
                                    {calculateTotal().toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Phí vận chuyển</span>
                                <span className="font-semibold">Miễn phí</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between">
                                    <span className="text-xl font-bold">Tổng cộng</span>
                                    <span className="text-xl font-bold text-indigo-600">
                                        {calculateTotal().toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                            </div>
                            <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-600 transition flex items-center justify-center mt-4 shadow-md">
                                <FiShoppingBag className="mr-3" size={22} />
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