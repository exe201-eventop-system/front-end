import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../features/store';
import { Services } from '../../features/Services/serviceThunks';
import { Link } from 'react-router-dom';
import { CalendarPlus, ShoppingCart, ArrowRightCircle } from 'lucide-react';
const ServiceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector((state: RootState) => state.service);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && services.length === 0) {
      dispatch(Services());
      hasFetched.current = true;
    }
  }, [dispatch, services.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 mt-24">
  <h2 className="text-2xl font-bold mb-4">Service List</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.map((service) => (

      <div
        key={service.id}
        className="bg-[#0F172A] rounded-2xl overflow-hidden shadow-md text-white hover:shadow-xl transition-shadow duration-300 flex flex-col"
      >
        <Link to={`/service/${service.id}`}>
                <img
          src={
            service.thumbnail ||
            'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/2/3/edit-z62841689452016a047f558dc53caaf16dfb2098ecbf85-17385723201521979496372.jpeg'
          }
          alt="Service Thumbnail"
          className="w-full h-48 object-cover"
        />
        </Link>

        <div className="p-4 flex flex-col flex-grow">
          <span className="inline-block bg-pink-500 text-white text-xs px-3 py-1 rounded-full mb-2 w-max">
            {service.category || 'Dịch vụ'}
          </span>
          <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
          <p className="text-sm text-gray-300 mb-4 flex-grow">
            {service.description || 'Không có mô tả.'}
          </p>
          <div className="text-sm text-gray-400 border-t border-gray-700 pt-2 mb-4">
            <span>Giá: {service.price ? `${service.price} VNĐ` : 'Liên hệ'}</span>

          </div>




<div className="flex flex-wrap gap-2 mt-auto">
  <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg transition">
    <CalendarPlus size={16} />
    Kế hoạch
  </button>
  <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 rounded-lg transition">
    <ShoppingCart size={16} />
    Giỏ hàng
  </button>
    <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition">
    <ArrowRightCircle size={16} />
    Đặt ngay
  </button>
</div>

        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default ServiceList;
