import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store';
import { ShoppingCart, Star, MapPin, User } from 'lucide-react';
import { addItemToCart } from '../../features/Cart/cartThunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetService } from '../../features/Services/serviceThunks';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import { setSelectedImageIndex } from '../../features/Services/serviceSlice';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getServicesDetailRating } from '../../features/Services/serviceThunks';

const Service = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, service, selected_image_index } = useSelector((state: RootState) => state.service);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();

  // Feedback state lấy từ BE
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(GetService({ id }));
      // Lấy feedback từ BE
      const fetchFeedback = async () => {
        setFeedbackLoading(true);
        const action: any = await (dispatch as any)(getServicesDetailRating({ service_id: id }));
        if (action.payload && action.payload.data) setFeedbackData(action.payload.data);
        setFeedbackLoading(false);
      };
      fetchFeedback();
    }
  }, [id, dispatch]);

  // Pagination cho feedbacks
  const currentFeedbacks = feedbackData && feedbackData.ratings ? feedbackData.ratings : [];
  const averageRating = feedbackData ? feedbackData.average_rating : 0;

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const addToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng.");
      navigate('/auth');
      return;
    }

    try {
      await dispatch(addItemToCart({ product_id: id! })).unwrap();
      toast.success("Đã thêm dịch vụ vào giỏ hàng thành công!");
    } catch (error: any) {
      toast.error("Dịch vụ đã được thêm vào giỏ hàng vui lòng chọn thời gian để thanh toán");
    }
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-[400px]">
            <img
              src={service?.thumbnail}
              alt={service?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block bg-purple-500 text-white text-sm px-4 py-1 rounded-full mb-4">
                {service?.category}
              </span>
              <h1 className="text-4xl font-bold mb-4">{service?.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="text-purple-300" size={20} />
                  <span>{service?.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="p-4 flex gap-4 overflow-x-auto">
            {service?.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => dispatch(setSelectedImageIndex(index))}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${selected_image_index === index ? 'border-purple-500' : 'border-transparent'
                  }`}
              >
                <img src={image.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Mô tả dịch vụ</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{service?.description}</p>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Thông tin nhà cung cấp</h3>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={service?.supplier?.avatar}
                          alt={service?.supplier?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-purple-900">{service?.supplier?.name}</h4>
                        {service?.supplier?.is_active === "true" && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Đã xác minh</span>
                        )}
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin size={14} className="text-purple-500" />
                          <span className="text-sm">{service?.supplier?.location}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/supplier/${service?.supplier?.supplier_id}`}
                      className="inline-flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <User size={16} />
                      Xem trang
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-purple-800">Đánh giá từ khách hàng</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(Math.floor(parseFloat(averageRating.toString())))}
                  </div>
                  <span className="text-lg font-bold text-purple-800">{averageRating}</span>
                  <span className="text-gray-600">({feedbackData?.ratings?.length || 0} đánh giá)</span>
                </div>
              </div>
              {feedbackLoading ? (
                <div>Đang tải đánh giá...</div>
              ) : (
                <div className="space-y-6">
                  {currentFeedbacks.length > 0 ? currentFeedbacks.map((feedback: any, idx: number) => (
                    <div key={idx} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{feedback.user_name}</h4>
                            <span className="text-sm text-gray-500">{feedback.created_at ? new Date(feedback.created_at).toLocaleDateString('vi-VN') : ''}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {renderStars(feedback.service_rating)}
                          </div>
                          <p className="text-gray-700 leading-relaxed">{feedback.service_comment}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-gray-500">Chưa có đánh giá nào.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {Array.isArray(service?.packages) && service.packages.length > 0 ? (
            <section className="mb-6">
              <div className="bg-white p-6 rounded-2xl shadow space-y-6">
                {/* PHẦN 1: Danh sách gói dịch vụ */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-purple-800">Danh sách gói dịch vụ</h3>
                  {service.packages.map((pkg, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border border-purple-100 rounded-xl px-4 py-3 hover:bg-purple-50 transition"
                    >
                      <h4 className="text-base sm:text-lg font-medium text-purple-900">
                        {pkg.package_name ?? 'Không xác định'}
                      </h4>
                      <p className="text-xl font-bold text-purple-600">
                        {pkg.price.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  ))}
                </div>

                {/* PHẦN 2: 3 nút hành động */}
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => addToCart()}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold py-3 rounded-xl transition"
                  >
                    <ShoppingCart size={15} />
                    Giỏ hàng
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <section className="mb-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-2xl font-bold text-purple-800 mb-1">
                  {service?.packages?.[0]?.price?.toLocaleString("vi-VN")}đ
                </h3>
                <p className="text-gray-500 text-sm">Giá đã bao gồm thuế</p>
              </div>
            </section>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Service;
