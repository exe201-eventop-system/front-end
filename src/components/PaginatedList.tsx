import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PaginatedListProps } from '../types/Pagination.type';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PaginatedList<T>({
  renderItem,
  pageSize = 10,
  fetchData,
}: PaginatedListProps<T>): React.ReactElement {
  const [data, setData] = useState<T[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      const result = await fetchData({ page, size: pageSize });
      setData(result.content || []);
      setPageCount(result.pageCount);
      setCurrentPage(result.currentPage);
    } catch (error) {
      console.error('Error loading data:', error);
      setData([]);
      setPageCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(0);
  }, [pageSize]);

  const handlePageClick = (event: { selected: number }) => {
    loadPage(event.selected);
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <div className="data-list space-y-4 mb-8">
            {data.map((item, index) => (
              <div key={index} className="transform transition-all duration-200 hover:scale-[1.01]">
                {renderItem(item)}
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-2">
            <ReactPaginate
              previousLabel={
                <div className="flex items-center space-x-1">
                  <ChevronLeft className="w-4 h-4" />
                  <span>Trước</span>
                </div>
              }
              nextLabel={
                <div className="flex items-center space-x-1">
                  <span>Sau</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              }
              breakLabel={
                <span className="px-4 py-2 text-gray-500">...</span>
              }
              pageCount={pageCount}
              forcePage={currentPage}
              onPageChange={handlePageClick}
              containerClassName="flex items-center space-x-2"
              pageClassName="px-2 py-1 text-gray-600 hover:text-purple-500 transition-colors duration-200"
              pageLinkClassName="block"
              activeClassName="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
              activeLinkClassName="block px-4 py-2"
              previousClassName="px-4 py-2 text-gray-600 hover:text-purple-500 transition-colors duration-200 flex items-center"
              nextClassName="px-4 py-2 text-gray-600 hover:text-purple-500 transition-colors duration-200 flex items-center"
              disabledClassName="opacity-50 cursor-not-allowed"
              disabledLinkClassName="cursor-not-allowed"
              breakClassName="text-gray-500"
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
            />
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            Trang {currentPage + 1} / {pageCount}
          </div>
        </>
      )}
    </div>
  );
}
