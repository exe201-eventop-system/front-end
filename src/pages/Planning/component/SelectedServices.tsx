import React from "react";
import { Minus } from "lucide-react";
import { Service } from "../../../types/Services/Services.type";

interface SelectedServicesProps {
  selectedServiceObjs: { service: Service; sessionServiceId: string }[];
  removingServiceId: string | null;
  handleRemoveService: (sessionService: {
    id: string;
    serviceId?: string;
  }) => void;
  handleBookNow: () => void;
  getMinPrice: (service: Service) => number | undefined;
  formatCurrency: (amount: number | null | undefined) => string;
}

const SelectedServices: React.FC<SelectedServicesProps> = ({
  selectedServiceObjs,
  removingServiceId,
  handleRemoveService,
  getMinPrice,
  formatCurrency,
}) => {
  return (
    <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-700 mb-4">
        Dịch vụ đã chọn
      </h4>
      {selectedServiceObjs.length > 0 ? (
        <div className="space-y-3">
          {selectedServiceObjs.map(({ service, sessionServiceId }) => (
            <div
              key={service.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200"
            >
              <div>
                <p className="font-medium text-gray-800">{service.name}</p>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium text-blue-600">
                  {getMinPrice(service) !== undefined
                    ? formatCurrency(getMinPrice(service))
                    : "Chưa có"}
                </p>
                <button
                  onClick={() => handleRemoveService({ id: sessionServiceId })}
                  className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                  disabled={removingServiceId === service.id}
                >
                  {removingServiceId === service.id ? (
                    "Đang xóa..."
                  ) : (
                    <Minus className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
          {/* <div className="flex justify-end mt-6">
                        <button
                            onClick={handleBookNow}
                            className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Đặt ngay
                        </button>
                    </div> */}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          Chưa có dịch vụ nào được chọn
        </p>
      )}
    </div>
  );
};

export default SelectedServices;
