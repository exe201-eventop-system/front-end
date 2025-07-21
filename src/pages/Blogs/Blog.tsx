import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../features/store';
import { useParams } from 'react-router-dom';
import { clearSelectedBlog } from '../../features/Blogs/blogSlice';
import { getBlogDetail } from '../../features/Blogs/blogThunks';
import { Calendar } from 'lucide-react';
import { BlogDetailResult } from '../../types/Blogs/Blog.type';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedBlog, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(getBlogDetail({ id }));
    }
    return () => {
      dispatch(clearSelectedBlog());
    };
  }, [dispatch, id]);

  if (loading) return <div className="text-center py-12 text-lg text-gray-500">Đang tải chi tiết bài viết...</div>;
  if (error) return <div className="text-center py-12 text-lg text-red-500">{error}</div>;
  if (!selectedBlog) return <div className="text-center py-12 text-lg text-gray-500">Không tìm thấy bài viết</div>;

  const detailBlog = selectedBlog as BlogDetailResult;
  const mainImage = detailBlog.thumbnail || (detailBlog.images && detailBlog.images[0]) || "/vite.svg";

  return (
    <div className="p-10 sm:p-6 mt-20 min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <div className=" mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden flex items-center justify-center bg-gray-100">
          <img
            src={mainImage}
            alt={detailBlog.title}
            className="w-full h-full object-cover object-center rounded-b-2xl transition-all duration-300"
          />
        </div>
        <div className="px-4 sm:px-10 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 text-center leading-tight">
            {detailBlog.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
            <Calendar className="w-5 h-5" />
            <span>{detailBlog.created_at?.slice(0, 10)}</span>
          </div>
          <p className="text-lg text-gray-700 mb-8 whitespace-pre-line leading-relaxed text-justify">
            {detailBlog.description}
          </p>
          {detailBlog.images && detailBlog.images.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Hình ảnh liên quan</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {detailBlog.images.map((img: string, idx: number) => (
                  <div key={idx} className="overflow-hidden rounded-xl border bg-gray-50">
                    <img
                      src={img}
                      alt={`Ảnh phụ ${idx + 1}`}
                      className="w-full h-32 sm:h-40 object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
