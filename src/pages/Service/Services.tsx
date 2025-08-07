import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../features/store';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  X,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { priceRanges } from '../../data/service';
import Pagination from '../../components/common/Pagination';
import { getServices } from '../../features/Services/serviceThunks';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import {
  setSearchTerm,
  setSelectedPriceRange,
  setCurrentPage,
  toggleFilterSection,
} from '../../features/Services/serviceSlice';

const ServiceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const { services, loading, error, filterUI, filter } = useSelector((state: RootState) => state.service);
  const { search_term, price_range } = useSelector(
    (state: RootState) => state.service.filter
  );

  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const filteredServices = services.content.filter((service: any) => {
    const matchPackage = !selectedPackage || (service.package && service.package.some((p: any) => p.package_name === selectedPackage));
    const matchSearch = !search_term || service.name.toLowerCase().includes(search_term.toLowerCase());
    return matchPackage && matchSearch;
  });

  const allPackages = Array.from(new Set(services.content.flatMap((service: any) => (service.package || []).map((p: any) => p.package_name))));

  // Xử lý search parameter từ URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');

    if (searchParam && searchParam !== search_term) {
      dispatch(setSearchTerm(searchParam));
      // Xóa parameter khỏi URL để tránh conflict
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('search');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [location.search, dispatch, search_term]);

  useEffect(() => {
    dispatch(getServices({
      page: filter.current_page,
      page_size: services.page_size || 12,
      search: filter.search_term,
    }));
  }, [dispatch, filter.current_page, filter.search_term, services.page_size]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(getServices({
      page: page,
      page_size: services.page_size || 12,
      search: filter.search_term,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <div className="p-6 mt-20 min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <h2 className="text-4xl font-bold mb-8 text-center">Dịch Vụ Nổi Bật</h2>

      <div className="max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                value={search_term}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
              {search_term && (
                <button
                  onClick={() => dispatch(setSearchTerm(''))}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            {/* Filter theo package */}
            <div className="flex gap-2 items-center">
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              >
                <option value="">Tất cả gói</option>
                {allPackages.map((pkg) => (
                  <option key={pkg} value={pkg}>{pkg}</option>
                ))}
              </select>
            </div>

          </div>

          {filterUI.showFilterOptions && (
            <div className="mt-6 pt-6 border-t border-purple-100">
              <div>
                <button onClick={() => dispatch(toggleFilterSection('price'))} className="w-full flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800">Khoảng giá</h4>
                  {filterUI.expandedFilters.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {filterUI.expandedFilters.price && (
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => dispatch(setSelectedPriceRange(range.label))}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${price_range === range.label ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                          }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6 text-purple-700 font-medium">
          Tìm thấy <span className="font-bold">{filteredServices.length}</span> dịch vụ
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service: any) => (
            <div key={service.id} className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group">
              <div className="relative">
                {/* Rating & Category Row on top of image */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                  {/* <div className="flex items-center gap-1 bg-white/80 rounded-full px-2 py-1 shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                    <span className="font-semibold text-yellow-500 text-sm">{service.rating?.toFixed(1) ?? '0.0'}</span>
                  </div> */}
                  <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                    {service.category || 'Dịch vụ'}
                  </span>
                </div>
                <img
                  src={service.thumbnail}
                  alt="Service Thumbnail"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-purple-800 group-hover:text-purple-600 mb-2 line-clamp-1">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2 mb-3 flex-grow line-clamp-2">
                  {service.description || 'Không có mô tả.'}
                </p>
                <div className="mb-3 p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-purple-800 line-clamp-1">{service.supplier.name}</span>
                    {service.supplier.is_active && <CheckCircle size={16} className="text-green-600" />}
                  </div>
                </div>

                <div className="border-t border-purple-100 pt-3">
                  <h4 className="text-sm font-semibold text-purple-700 mb-2">Các gói dịch vụ:</h4>
                  {service.package?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {service.package.map((option: { package_name: string }, index: number) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium shadow-sm hover:bg-purple-200 transition"
                        >
                          <span className="text-[11px] italic text-purple-600">
                            {option.package_name ?? 'Không xác định'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Liên hệ để biết thêm chi tiết</p>
                  )}
                </div>

                <Link to={`/service/${service.id}`} className="mt-4">
                  <button className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-colors">
                    Xem chi tiết
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Pagination
            currentPage={services.current_page}
            pageCount={services.page_count}
            pageSize={services.page_size}
            itemCount={services.item_amount}
            onPageChange={handlePageChange}
          />
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-purple-700 text-lg">Không tìm thấy dịch vụ phù hợp với bộ lọc của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
// sẽ pass mon 