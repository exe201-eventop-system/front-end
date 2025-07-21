import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../features/store";
import { getAllBlog } from "../../features/Blogs/blogThunks";
import Pagination from "../../components/common/Pagination";

const PAGE_SIZE = 9;

const Blogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error, item_amount, page_count } = useSelector((state: RootState) => state.blog);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllBlog({ Page: page, PageSize: PAGE_SIZE, TitleContain: searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-6 mt-20 min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
          <p className="text-gray-600 ">
            Khám phá những bài viết mới nhất về tổ chức sự kiện, xu hướng công nghệ và kinh nghiệm thực tế
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full px-4 py-2 pl-10 bg-white border border-purple-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="text-center py-12 text-lg text-red-500">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Không tìm thấy bài viết nào phù hợp với tìm kiếm của bạn
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="group bg-white rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.thumbnail || "/vite.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{blog.created_at?.slice(0, 10)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Pagination
                currentPage={page}
                pageCount={page_count}
                pageSize={PAGE_SIZE}
                itemCount={item_amount}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
