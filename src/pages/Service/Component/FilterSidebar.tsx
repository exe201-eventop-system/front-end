import { ChevronDown, ChevronUp, RefreshCw, X } from "lucide-react"
import { useState } from "react";
import { categories, priceRanges } from "../../../data/service";

interface FilterSidebarProps {
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedPriceRange: string;
    setSelectedPriceRange: (range: string) => void;
    resetFilters: () => void;
}

const FilterSidebar = ({
    showFilters,
    setShowFilters,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    resetFilters
}: FilterSidebarProps) => {
    const [expandedFilters, setExpandedFilters] = useState({
        category: true,
        price: true,
        features: true
    });

    const toggleFilterSection = (section: keyof typeof expandedFilters) => {
        setExpandedFilters(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className={` top-0 right-0 h-full w-[18%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 
      ${showFilters ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} 
      p-6`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold ">Bộ lọc</h3>
                <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-purple-600 hover:text-purple-800"
                >
                    <X size={24} />
                </button>
            </div>

            <button
                onClick={resetFilters}
                className="w-full mb-6 flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 rounded-lg transition-colors"
            >
                <RefreshCw size={16} />
                Đặt lại bộ lọc
            </button>

            {/* Category Filter */}
            <div className="mb-6">
                <button
                    onClick={() => toggleFilterSection('category')}
                    className="w-full flex justify-between items-center mb-3"
                >
                    <h4 className="font-semibold ">Danh mục</h4>
                    {expandedFilters.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFilters.category && (
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${selectedCategory === category
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <button
                    onClick={() => toggleFilterSection('price')}
                    className="w-full flex justify-between items-center mb-3"
                >
                    <h4 className="font-semibold ">Khoảng giá</h4>
                    {expandedFilters.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFilters.price && (
                    <div className="space-y-2">
                        {priceRanges.map((range) => (
                            <button
                                key={range.label}
                                onClick={() => setSelectedPriceRange(range.label)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${selectedPriceRange === range.label
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Features Filter */}
            <div>
                <button
                    onClick={() => toggleFilterSection('features')}
                    className="w-full flex justify-between items-center mb-3"
                >
                    <h4 className="font-semibold ">Tính năng</h4>
                    {expandedFilters.features ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFilters.features && (
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                            <span className="text-purple-700">Đã xác minh</span>
                        </label>
                        <label className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                            <span className="text-purple-700">Có sẵn ngay</span>
                        </label>
                        <label className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                            <span className="text-purple-700">Khuyến mãi</span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterSidebar;