import React from 'react';
import { Service } from '../../../types/Services/Services.type';

interface AvailableServicesProps {
    services: Service[];
    expandedEventDetails: any;
    addingServiceId: string | null;
    handleAddService: (service: Service) => void;
    selectedServiceIds: string[];
    cartServiceIds: string[];
    getMinPrice: (service: Service) => number | undefined;    formatCurrency: (amount: number | null | undefined) => string;
}

const AvailableServices: React.FC<AvailableServicesProps> = ({ services, addingServiceId, handleAddService, selectedServiceIds, cartServiceIds,  formatCurrency }) => {
    return (
        <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Dịch vụ có sẵn</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service: Service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    const isInCart = cartServiceIds.includes(service.id);
                    return (
                        <div
                            key={service.id}
                            className="p-5 rounded-2xl border shadow-md bg-white hover:shadow-xl transition-all duration-200 flex flex-col items-center group relative"
                        >
                            <img src={service.thumbnail || '/default-service.png'} alt={service.name} className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-purple-100 group-hover:scale-105 transition-transform" />
                            <h5 className="font-semibold text-lg text-gray-800 mb-1 text-center">{service.name}</h5>
                            <p className="text-sm text-gray-500 mb-2 text-center line-clamp-2">{service.description}</p>
                            {service.packages && service.packages.length > 0 && (
                                <div className="w-full mb-3">
                                    <div className="font-semibold text-sm text-gray-700 mb-1">Các gói dịch vụ:</div>
                                    <ul className="space-y-1">
                                        {service.packages.map((pkg, idx) => (
                                            <li key={idx} className="flex justify-between text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                                                <span>{pkg.package_name}</span>
                                                <span className="font-medium text-purple-600">{formatCurrency(pkg.price)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full mt-2 ${isSelected || isInCart ? 'bg-green-500 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                                onClick={() => handleAddService(service)}
                                disabled={isSelected || isInCart || addingServiceId === service.id}
                            >
                                {addingServiceId === service.id ? 'Đang thêm...' : (isSelected || isInCart) ? 'Đã thêm' : 'Thêm'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AvailableServices; 