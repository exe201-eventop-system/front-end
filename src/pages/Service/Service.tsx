import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../features/store';
//import { useParams } from 'react-router-dom';
// import { BlogDetail} from '../../features/Blogs/blogThunks';
// import { clearSelectedBlog } from '../../features/Blogs/blogSlice';
import { CalendarPlus, ShoppingCart, ArrowRightCircle, Star, Clock, MapPin, Users, Phone, Mail, Globe } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { addItemToCart } from '../../features/Cart/cartThunk';

// Mock data for service details
const mockServiceDetails = {
  id: '1',
  name: 'Tổ Chức Sự Kiện',
  description: 'Chúng tôi cung cấp dịch vụ tổ chức sự kiện chuyên nghiệp, từ concept đến thực hiện. Với đội ngũ giàu kinh nghiệm và sáng tạo, chúng tôi cam kết mang đến những trải nghiệm đáng nhớ cho khách hàng.',
  price: 5000000,
  category: 'Sự kiện',
  thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  rating: 4.8,
  reviews: 128,
  duration: '2-3 giờ',
  location: 'Toàn quốc',
  capacity: '50-500 người',
  supplier: {
    name: 'EventPro Solutions',
    rating: 4.8,
    reviews: 156,
    location: 'Hà Nội',
    verified: true,
    description: 'Nhà cung cấp dịch vụ sự kiện hàng đầu với hơn 10 năm kinh nghiệm trong ngành.',
    contact: {
      phone: '0987654321',
      email: 'contact@eventpro.vn',
      website: 'www.eventpro.vn'
    },
    services: ['Tổ chức sự kiện', 'Trang trí', 'Âm thanh ánh sáng', 'Catering']
  },
  features: [
    'Lên kế hoạch chi tiết',
    'Quản lý ngân sách',
    'Điều phối nhân sự',
    'Xử lý hậu cần',
    'Trang trí sự kiện',
    'Quản lý khách mời'
  ],
  images: [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  ]
};

const ServiceDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  console.log(id);
  const addToCart = () => {
    if (id) {
      dispatch(addItemToCart(id)).unwrap();
    }
  }
  // const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  // const dispatch = useDispatch<AppDispatch>();

  // Comment phần gọi API
  // useEffect(() => {
  //   if (id) {
  //     dispatch(BlogDetail({ id }));
  //   }
  //   return () => {
  //     dispatch(clearSelectedBlog());
  //   };
  // }, [dispatch, id]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // if (!selectedBlog) return <div>Blog not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-[400px]">
            <img
              src={mockServiceDetails.images[selectedImage]}
              alt={mockServiceDetails.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block bg-purple-500 text-white text-sm px-4 py-1 rounded-full mb-4">
                {mockServiceDetails.category}
              </span>
              <h1 className="text-4xl font-bold mb-4">{mockServiceDetails.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400" size={20} />
                  <span className="font-semibold">{mockServiceDetails.rating}</span>
                  <span className="text-gray-300">({mockServiceDetails.reviews} đánh giá)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="text-purple-300" size={20} />
                  <span>{mockServiceDetails.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="text-purple-300" size={20} />
                  <span>{mockServiceDetails.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="text-purple-300" size={20} />
                  <span>{mockServiceDetails.capacity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="p-4 flex gap-4 overflow-x-auto">
            {mockServiceDetails.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-purple-500' : 'border-transparent'
                  }`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Mô tả dịch vụ</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{mockServiceDetails.description}</p>

              <h3 className="text-xl font-semibold text-purple-800 mb-4">Tính năng nổi bật</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockServiceDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Supplier Information Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">Thông tin nhà cung cấp</h3>
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-bold text-purple-900">{mockServiceDetails.supplier.name}</h4>
                      {mockServiceDetails.supplier.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Đã xác minh</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-400" size={20} />
                      <span className="font-semibold">{mockServiceDetails.supplier.rating}</span>
                      <span className="text-gray-500">({mockServiceDetails.supplier.reviews} đánh giá)</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{mockServiceDetails.supplier.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={18} className="text-purple-500" />
                        <span>{mockServiceDetails.supplier.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={18} className="text-purple-500" />
                        <span>{mockServiceDetails.supplier.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={18} className="text-purple-500" />
                        <span>{mockServiceDetails.supplier.contact.email}</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-800 mb-2">Dịch vụ cung cấp:</h5>
                      <div className="flex flex-wrap gap-2">
                        {mockServiceDetails.supplier.services.map((service, index) => (
                          <span key={index} className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://${mockServiceDetails.supplier.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
                  >
                    <Globe size={18} />
                    Truy cập website
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-800 mb-2">
                  {mockServiceDetails.price.toLocaleString()} VNĐ
                </h3>
                <p className="text-gray-500 text-sm">Giá đã bao gồm thuế</p>
              </div>

              <div className="space-y-4">
                <button onClick={addToCart} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white font-semibold py-3 rounded-xl transition">
                  <CalendarPlus size={20} />
                  Đặt lịch ngay
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-3 rounded-xl transition border border-purple-200">
                  <ShoppingCart size={20} />
                  Thêm vào giỏ hàng
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold py-3 rounded-xl transition">
                  <ArrowRightCircle size={20} />
                  Liên hệ tư vấn
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-3">Thông tin bổ sung</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={18} className="text-purple-500" />
                    <span>Thời gian: {mockServiceDetails.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={18} className="text-purple-500" />
                    <span>Địa điểm: {mockServiceDetails.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users size={18} className="text-purple-500" />
                    <span>Sức chứa: {mockServiceDetails.capacity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
