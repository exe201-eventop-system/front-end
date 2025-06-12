import { useState, useEffect } from 'react';
//import { Services } from '../../features/Services/serviceThunks';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  Star,
  SlidersHorizontal,
  CheckCircle,
} from 'lucide-react';
import { mockServices, priceRanges } from '../../data/service';
import FilterSidebar from './Component/FilterSidebar';
import Pagination from '../../components/Pagination';


const ServiceList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // 3 columns x 3 rows
  const resetFilters = () => {
    setSelectedCategory('Tất cả');
    setSelectedPriceRange('Tất cả');
    setSearchTerm('');
    setSortBy('popular');
    setCurrentPage(1);
  };



  const filteredServices = mockServices
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tất cả' || service.category === selectedCategory;
      const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
      const matchesPrice = priceRange && service.price >= priceRange.min && service.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.supplier.rating - a.supplier.rating;
        default:
          return b.supplier.reviews - a.supplier.reviews;
      }
    });

  // Calculate pagination values
  const totalItems = filteredServices.length;
  const pageCount = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentServices = filteredServices.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy]);

  return (
    <div className="p-6 mt-20 min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <h2 className="text-4xl font-bold mb-8 text-center">Dịch Vụ Nổi Bật</h2>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            resetFilters={resetFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
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
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  >
                    <option value="popular">Phổ biến nhất</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex lg:hidden w-full mb-6 flex items-center justify-center gap-2 bg-white py-3 rounded-xl shadow-lg"
            >
              <SlidersHorizontal size={20} />
              <span className="font-semibold text-black">Bộ lọc</span>
            </button>

            {/* Results Count */}
            <div className="mb-6">
              Tìm thấy <span className="text-purple-700 font-bold">{filteredServices.length}</span> dịch vụ
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative">
                    <Link to={`/service/${service.id}`}>
                      <img
                        src={service.thumbnail}
                        alt="Service Thumbnail"
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>

                    {/* Category badge ở góc trên bên phải */}
                    <div className="absolute top-2 right-2">
                      <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                        {service.category || 'Dịch vụ'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold mb-2 text-purple-800 group-hover:text-purple-600 transition-colors">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400" />
                        <span className="text-sm font-medium">{service.supplier.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 flex-grow">
                      {service.description || 'Không có mô tả.'}
                    </p>

                    {/* Service Details */}
                    {/* <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package size={18} className="text-purple-500" />
                        <span>theo giờ</span>
                      </div>
                      <button className="flex items-center justify-center gap-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-center">
                        <ArrowRightCircle size={10} />
                        Đặt ngay
                      </button>
                    </div> */}

                    {/* Supplier Information */}
                    <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-purple-800">{service.supplier.name}</span>

                          {service.supplier.verified && (
                            <CheckCircle size={16} className="text-green-600" />
                          )}

                          <div className="flex items-center gap-1">
                            <span>{service.supplier.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-purple-600 border-t border-purple-100 pt-2 mb-4 font-semibold  flex justify-end">
                      <span>Giá: {service.price ? `${service.price.toLocaleString()} VNĐ` : 'Liên hệ'}</span>
                    </div>
                    {/* <div className="flex items-center justify-center">
                      <div className="flex gap-4">
                        <button className="flex items-center justify-center gap-1 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-center">
                          <CalendarPlus size={14} />
                          Kế hoạch
                        </button>
                        <button onClick={() => addToCart(service.id)} className="flex items-center justify-center gap-1 bg-white hover:bg-purple-50 text-purple-600 text-xs font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border-2 border-purple-200 hover:border-purple-300 text-center">
                          <ShoppingCart size={14} />
                          Giỏ hàng
                        </button>
                      </div>
                    </div> */}

                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filteredServices.length > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  pageSize={pageSize}
                  itemCount={totalItems}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-purple-700 text-lg">Không tìm thấy dịch vụ phù hợp với bộ lọc của bạn.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
