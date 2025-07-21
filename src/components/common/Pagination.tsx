import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    itemCount: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    pageCount,
    pageSize,
    itemCount,
    onPageChange,
}: PaginationProps) => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, itemCount);

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-4 py-2 rounded-lg transition-colors ${currentPage === i
                            ? "bg-purple-600 text-white"
                            : "bg-white text-gray-700 hover:bg-purple-50"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white text-gray-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                {renderPageNumbers()}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                    className="p-2 rounded-lg bg-white text-gray-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            <p className="text-sm text-gray-600">
                Hiển thị {startItem}-{endItem} của {itemCount} kết quả
            </p>
        </div>
    );
};

export default Pagination; 