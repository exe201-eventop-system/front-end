import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../features/store';
// import { Services } from '../../features/Services/serviceThunks';
import { Link } from 'react-router-dom';
import { CalendarPlus, ShoppingCart, ArrowRightCircle, Search, Filter, X, Star, MapPin } from 'lucide-react';

// Mock data
const mockServices = [
  {
    id: '1',
    name: 'Tổ Chức Sự Kiện',
    description: 'Chúng tôi cung cấp dịch vụ tổ chức sự kiện chuyên nghiệp, từ concept đến thực hiện.',
    price: 5000000,
    category: 'Sự kiện',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    supplier: {
      name: 'EventPro Solutions',
      rating: 4.8,
      reviews: 156,
      location: 'Hà Nội',
      verified: true
    }
  },
  {
    id: '2',
    name: 'Trang Trí Sân Khấu',
    description: 'Thiết kế và trang trí sân khấu độc đáo, phù hợp với từng loại sự kiện.',
    price: 3000000,
    category: 'Trang trí',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    supplier: {
      name: 'Decor Master',
      rating: 4.6,
      reviews: 89,
      location: 'TP.HCM',
      verified: true
    }
  },
  {
    id: '3',
    name: 'Âm Thanh Ánh Sáng',
    description: 'Hệ thống âm thanh và ánh sáng chuyên nghiệp cho mọi quy mô sự kiện.',
    price: 4000000,
    category: 'Âm thanh',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    supplier: {
      name: 'Sound & Light Pro',
      rating: 4.9,
      reviews: 203,
      location: 'Đà Nẵng',
      verified: true
    }
  },
  {
    id: '4',
    name: 'Catering',
    description: 'Dịch vụ ăn uống cao cấp với thực đơn đa dạng, phù hợp mọi sự kiện.',
    price: 10000000,
    category: 'Ẩm thực',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    supplier: {
      name: 'Gourmet Catering',
      rating: 4.7,
      reviews: 178,
      location: 'Hà Nội',
      verified: true
    }
  },
  {
    id: '5',
    name: 'MC Chuyên Nghiệp',
    description: 'Đội ngũ MC chuyên nghiệp, giàu kinh nghiệm trong mọi loại sự kiện.',
    price: 2000000,
    category: 'Nhân sự',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    supplier: {
      name: 'MC Pro Team',
      rating: 4.8,
      reviews: 145,
      location: 'TP.HCM',
      verified: true
    }
  },
];

// Categories for filter
const categories = ['Tất cả', 'Sự kiện', 'Trang trí', 'Âm thanh', 'Ẩm thực', 'Nhân sự'];

// Price ranges for filter
const priceRanges = [
  { label: 'Tất cả', min: 0, max: Infinity },
  { label: 'Dưới 3 triệu', min: 0, max: 3000000 },
  { label: '3 - 5 triệu', min: 3000000, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: 'Trên 10 triệu', min: 10000000, max: Infinity },
];

const ServiceList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);

  // Filter services based on search term, category and price range
  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || service.category === selectedCategory;
    const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
    const matchesPrice = priceRange && service.price >= priceRange.min && service.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="p-6 mt-24 min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <h2 className="text-3xl font-bold mb-8 text-purple-700 text-center drop-shadow">Dịch Vụ Nổi Bật</h2>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors mb-4"
          >
            <Filter size={20} />
            <span className="font-semibold">Bộ lọc</span>
          </button>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-purple-50 rounded-xl">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-purple-800 mb-3">Danh mục</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-700 hover:bg-purple-100'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold text-purple-800 mb-3">Khoảng giá</h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(range.label)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPriceRange === range.label
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-700 hover:bg-purple-100'
                        }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <Link to={`/service/${service.id}`}>
              <img
                src={service.thumbnail}
                alt="Service Thumbnail"
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full mb-2 w-max font-semibold">
                {service.category || 'Dịch vụ'}
              </span>
              <h3 className="text-xl font-bold mb-2 text-purple-800">{service.name}</h3>
              <p className="text-sm text-gray-700 mb-4 flex-grow">
                {service.description || 'Không có mô tả.'}
              </p>

              {/* Supplier Information */}
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-purple-800">{service.supplier.name}</span>
                    {service.supplier.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Đã xác minh</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-sm font-medium">{service.supplier.rating}</span>
                    <span className="text-xs text-gray-500">({service.supplier.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin size={14} className="text-purple-500" />
                  <span>{service.supplier.location}</span>
                </div>
              </div>

              <div className="text-sm text-purple-600 border-t border-purple-100 pt-2 mb-4 font-semibold">
                <span>Giá: {service.price ? `${service.price.toLocaleString()} VNĐ` : 'Liên hệ'}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white text-sm font-semibold py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                  <CalendarPlus size={16} />
                  Kế hoạch
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-purple-50 text-purple-600 text-sm font-semibold py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border-2 border-purple-200 hover:border-purple-300">
                  <ShoppingCart size={16} />
                  Giỏ hàng
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white text-sm font-semibold py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                  <ArrowRightCircle size={16} />
                  Đặt ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-700 text-lg">Không tìm thấy dịch vụ phù hợp với bộ lọc của bạn.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
