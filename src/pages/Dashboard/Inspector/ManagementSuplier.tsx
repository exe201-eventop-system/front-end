import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../features/store";
import { GetListSupplierNotAccept, ProcessSupplier } from "../../../features/Supplier/supplierThunks";
import { SupplierProfileDTO, ProcessRequestInspectorDTO } from "../../../types/Supplier/Supplier.type";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagementSupplier = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pendingSuppliers, pendingLoading, pendingError, processLoading } = useSelector(
    (state: RootState) => state.supplier
  );

  const [selectedSupplier, setSelectedSupplier] = useState<SupplierProfileDTO | null>(null);
  const [isAccept, setIsAccept] = useState<boolean | null>(null);
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  useEffect(() => {
    dispatch(GetListSupplierNotAccept());
  }, [dispatch]);

  const handleProcessSupplier = async () => {
    if (!selectedSupplier || isAccept === null) {
      toast.error("Vui lòng chọn hành động");
      return;
    }

    if (isAccept && !contractFile) {
      toast.error("Vui lòng chọn file hợp đồng");
      return;
    }

    try {
      const payload: ProcessRequestInspectorDTO = {
        id: selectedSupplier.id,
        isAccept,
        contract: isAccept ? contractFile || undefined : undefined,
      };

      const result = await dispatch(ProcessSupplier(payload));

      if (ProcessSupplier.fulfilled.match(result)) {
        toast.success(
          isAccept
            ? "Đã chấp nhận supplier thành công!"
            : "Đã từ chối supplier thành công!"
        );
        setShowModal(false);
        setSelectedSupplier(null);
        setIsAccept(null);
        setContractFile(null);
        // Refresh danh sách
        dispatch(GetListSupplierNotAccept());
      } else {
        toast.error("Xử lý thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const openProcessModal = (supplier: SupplierProfileDTO) => {
    setSelectedSupplier(supplier);
    setIsAccept(null);
    setContractFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSupplier(null);
    setIsAccept(null);
    setContractFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContractFile(file);
    }
  };

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const openDescriptionModal = (description: string) => {
    setSelectedDescription(description);
    setShowDescriptionModal(true);
  };

  const closeDescriptionModal = () => {
    setShowDescriptionModal(false);
    setSelectedDescription(null);
  };

  if (pendingLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (pendingError) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-xl mb-4">Lỗi: {pendingError}</div>
        <button
          onClick={() => dispatch(GetListSupplierNotAccept())}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Quản lý nhà cung cấp
        </h1>
        <p className="text-gray-600">
          Danh sách nhà cung cấp chờ phê duyệt ({pendingSuppliers.length})
        </p>
      </div>

      {pendingSuppliers.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-500 text-xl mb-4">
            Không có nhà cung cấp nào chờ phê duyệt
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {supplier.thumnnail && (
                    <div className="relative">
                      <img
                        src={supplier.thumnnail}
                        alt="Thumbnail"
                        className="w-16 h-16 rounded-xl object-cover cursor-pointer hover:opacity-80 transition-opacity shadow-md"
                        onClick={() => openImageModal(supplier.thumnnail)}
                      />

                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-1">
                      {supplier.nameOrginazation}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <span className="mr-2">📧</span>
                      {supplier.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thông tin cơ bản */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">ℹ️</span>
                  Thông tin liên hệ
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📞</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Số điện thoại</p>
                      <p className="text-sm font-medium text-gray-800">{supplier.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📍</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Địa chỉ</p>
                      <p className="text-sm font-medium text-gray-800">{supplier.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">🏢</span>
                    </div>
    <div>
                      <p className="text-xs text-gray-500">Mã số thuế</p>
                      <p className="text-sm font-medium text-gray-800">{supplier.taxCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mô tả */}
              {supplier.description && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <span className="mr-2">📝</span>
                    Mô tả:
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {supplier.description.length > 150
                        ? `${supplier.description.substring(0, 150)}...`
                        : supplier.description
                      }
                    </p>
                    {supplier.description.length > 150 && (
                      <button
                        onClick={() => openDescriptionModal(supplier.description)}
                        className="text-blue-500 text-xs mt-2 hover:text-blue-700 font-medium"
                      >
                        Xem thêm
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Hình ảnh tổ chức */}
              {supplier.orginazationImages && supplier.orginazationImages.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2">🖼️</span>
                    Hình ảnh tổ chức
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex space-x-3 overflow-x-auto">
                      {supplier.orginazationImages.slice(0, 3).map((image, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <img
                            src={image}
                            alt={`Organization ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openImageModal(image)}
                          />

                        </div>
                      ))}
                      {supplier.orginazationImages.length > 3 && (
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500 border-2 border-white shadow-md">
                          <div className="text-center">
                            <div className="text-lg font-bold">+{supplier.orginazationImages.length - 3}</div>
                            <div className="text-xs">ảnh</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Giấy phép kinh doanh */}
              {supplier.businessLicense && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2">📄</span>
                    Giấy phép kinh doanh
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="relative">
                      <img
                        src={supplier.businessLicense}
                        alt="Business License"
                        className="w-full h-40 object-cover rounded-lg border-2 border-white shadow-md cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openImageModal(supplier.businessLicense)}
                      />

                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => openProcessModal(supplier)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">⚡</span>
                  Xử lý phê duyệt
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal xử lý phê duyệt */}
      {showModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Xử lý phê duyệt</h2>

            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Nhà cung cấp: <span className="font-semibold">{selectedSupplier.nameOrginazation}</span>
              </p>
            </div>

            {/* Chọn hành động */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hành động:
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="action"
                    value="accept"
                    checked={isAccept === true}
                    onChange={() => setIsAccept(true)}
                    className="mr-2"
                  />
                  <span className="text-green-600">Chấp nhận</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="action"
                    value="reject"
                    checked={isAccept === false}
                    onChange={() => setIsAccept(false)}
                    className="mr-2"
                  />
                  <span className="text-red-600">Từ chối</span>
                </label>
              </div>
            </div>

            {/* Upload hợp đồng (chỉ khi chấp nhận) */}
            {isAccept === true && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File hợp đồng <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {contractFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Đã chọn: {contractFile.name}
                  </p>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleProcessSupplier}
                disabled={processLoading || isAccept === null || (isAccept && !contractFile)}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processLoading ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal hiển thị ảnh phóng to */}
      {showImageModal && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full mx-4">
            {/* Nút đóng */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Ảnh phóng to */}
            <img
              src={selectedImage}
              alt="Phóng to"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Modal hiển thị mô tả đầy đủ */}
      {showDescriptionModal && selectedDescription && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeDescriptionModal}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            {/* Nút đóng */}
            <button
              onClick={closeDescriptionModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Nội dung mô tả */}
            <div className="mt-2">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📝</span>
                Mô tả chi tiết
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
      />
    </div>
  );
};

export default ManagementSupplier;
