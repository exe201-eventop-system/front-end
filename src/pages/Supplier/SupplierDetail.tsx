import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, MapPin, CheckCircle2 } from 'lucide-react';
import { getSuppliersDetail, getSuppliersDetailRating } from '../../features/Supplier/supplierThunks';
import { SupplierDetailDTO, SupplierRatingDetailDto } from '../../types/Supplier/Suppliers.type';
import dayjs from 'dayjs';

const ReviewsSection = ({ supplierId }: { supplierId: string }) => {
    const dispatch = useDispatch();
    const [ratingData, setRatingData] = useState<SupplierRatingDetailDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRating = async () => {
            setLoading(true);
            try {
                const action: any = await (dispatch as any)(
                    getSuppliersDetailRating({ supplier_id: supplierId })
                );
                if (action.payload?.data) {
                    setRatingData(action.payload.data);
                }
            } finally {
                setLoading(false);
            }
        };
        if (supplierId) fetchRating();
    }, [dispatch, supplierId]);

    if (loading) return <div>Đang tải đánh giá...</div>;
    if (!ratingData) return <div>Không có dữ liệu đánh giá.</div>;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Đánh giá từ khách hàng</h2>

            <div className="flex items-center mb-6">
                <span className="text-5xl font-bold text-purple-700 mr-4">
                    {ratingData.average_rating?.toFixed(1) ?? '0.0'}
                </span>

                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-6 h-6 ${i < Math.round(ratingData.average_rating ?? 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>

                <div className="ml-4">
                    <p className="text-gray-600">Dựa trên {ratingData.ratings?.length ?? 0} đánh giá</p>
                </div>
            </div>

            <div className="space-y-6">
                {ratingData.ratings?.length > 0 ? (
                    ratingData.ratings.map((review, idx) => (
                        <div key={idx} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-semibold text-gray-800">{review.user_name}</span>
                                {/* Nếu có date thì hiển thị */}
                                {review.create_at && (
                                    <span className="text-sm text-gray-500">
                                        {dayjs(review.create_at).format('DD/MM/YYYY HH:mm')}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < review.supplier_rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-700 leading-relaxed">{review.supplier_comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                )}
            </div>
        </div>
    );
};

const SupplierDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [supplier, setSupplier] = useState<SupplierDetailDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchSupplier = async () => {
            setLoading(true);
            try {
                const action: any = await (dispatch as any)(getSuppliersDetail({ id: id! }));
                if (action.payload?.data) {
                    setSupplier(action.payload.data);
                }
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchSupplier();
    }, [dispatch, id]);

    if (loading) {
        return <div className="text-center py-20 text-xl text-gray-600">Đang tải thông tin nhà cung cấp...</div>;
    }

    if (!supplier) {
        return <div className="text-center py-20 text-xl text-gray-600">Không tìm thấy nhà cung cấp.</div>;
    }

    // Kết hợp thumbnail với các ảnh khác (không trùng thumbnail)
    const allImages = [supplier.thumbnail, ...(supplier.images ?? [])];
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 py-10 mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Ảnh chính và gallery */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 relative">
                            <img
                                src={allImages[currentImageIndex]}
                                alt="Supplier"
                                className="w-full h-96 object-cover rounded-xl mb-4"
                            />
                            {allImages.length > 1 && (
                                <div className="flex justify-center gap-3 mt-4">
                                    {allImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Gallery ${index}`}
                                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${index === currentImageIndex
                                                ? 'border-4 border-purple-500'
                                                : 'border-2 border-gray-300 hover:border-purple-300'
                                                }`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Về chúng tôi */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-purple-800 mb-2">
                                        {supplier.name_organization}
                                    </h1>
                                    <div className="flex items-center gap-3 mb-2">
                                        <MapPin className="w-5 h-5 text-purple-500" />
                                        <span className="text-gray-700 font-medium">{supplier.location}</span>
                                    </div>
                                </div>
                                {supplier.is_active && (
                                    <span className="flex items-center text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
                                        <CheckCircle2 className="w-5 h-5 mr-1" /> Đã xác thực
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold text-purple-800 mb-6">Về chúng tôi</h2>
                            <p className="text-gray-700 leading-relaxed text-lg mb-4">{supplier.description}</p>
                        </div>

                        {/* Đánh giá */}
                        <ReviewsSection supplierId={id!} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierDetail;
