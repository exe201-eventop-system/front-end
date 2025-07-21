import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '../../features/store';
import { getSuppliers } from '../../features/Supplier/supplierThunks';
import { Link } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Suppliers = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { suppliers, loading, error, total, pageSize } = useSelector((state: RootState) => state.supplier);

    // Filter state
    const [searchKey] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Gọi API khi filter thay đổi
    useEffect(() => {
        dispatch(getSuppliers({
            search_key: searchKey,
            page_number: currentPage,
            page_size: pageSize,
        }));
    }, [dispatch, searchKey, currentPage]);

    // Pagination
    const pageCount = Math.ceil(total / pageSize);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="p-6 mt-20 min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <h2 className="text-4xl font-bold mb-8 text-center">Nhà Cung Cấp Nổi Bật</h2>
            <div className="max-w-7xl mx-auto">
                {/* Results */}
                <div className="mb-6 text-purple-700 font-medium">
                    Tìm thấy <span className="font-bold">{total}</span> nhà cung cấp
                </div>

                {loading ? (
                    <div className="text-center py-12 text-purple-700">Đang tải...</div>
                ) : error ? (
                    <div className="text-center py-12 text-red-600">{error}</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {suppliers.map(supplier => (
                                <div key={supplier.id} className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group">
                                    <div className="relative">
                                        {/* Rating & Address Row on top of image */}

                                        <img
                                            src={supplier.thumbnail}
                                            alt={supplier.name}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-purple-800 group-hover:text-purple-600 mb-2 line-clamp-1">
                                            {supplier.name}
                                        </h3>
                                        <p className="text-sm text-gray-700 line-clamp-2 mb-3 flex-grow">
                                            {supplier.description}
                                        </p>
                                        <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm mb-2">
                                            {supplier.address}
                                        </span>
                                        <Link to={`/supplier/${supplier.id}`} className="mt-4">
                                            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-2 rounded-lg transition-colors">
                                                Xem chi tiết
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {total > 0 && (
                            <div className="mt-8">
                                <Pagination
                                    currentPage={currentPage}
                                    pageCount={pageCount}
                                    pageSize={pageSize}
                                    itemCount={total}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}

                        {/* No Results Message */}
                        {suppliers.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-purple-700 text-lg">Không tìm thấy nhà cung cấp phù hợp với bộ lọc của bạn.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Suppliers; 