import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { PaginatedListProps } from '../types/Pagination.type';

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
    <div>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          <div className="data-list space-y-2">
            {data.map((item, index) => (
              <div key={index}>{renderItem(item)}</div>
            ))}
          </div>

          <ReactPaginate
            previousLabel={'← Trước'}
            nextLabel={'Sau →'}
            breakLabel={'...'}
            pageCount={pageCount}
            forcePage={currentPage}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </>
      )}
    </div>
  );
}
