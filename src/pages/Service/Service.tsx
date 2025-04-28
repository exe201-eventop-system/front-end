import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../features/store'; 
import { useParams } from 'react-router-dom';
import { BlogDetail} from '../../features/Blogs/blogThunks'; // Import BlogDetail action và clearSelectedBlog
import { clearSelectedBlog } from '../../features/Blogs/blogSlice';
const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  // Sử dụng useSelector để lấy selectedBlog
  const { selectedBlog, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(BlogDetail({ id })); // Gọi action BlogDetail để lấy dữ liệu chi tiết blog
    }

    return () => {
      dispatch(clearSelectedBlog()); // Sau khi component unmount, clear selectedBlog
    };
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedBlog) return <div>Blog not found</div>;

  return (
    <div>
      <h2>{selectedBlog.title}</h2>
       <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfP7AyWH52X0gbPoZF6NIu0TEfaghZ5rL4Q&s' alt={selectedBlog.title} />
      <p><strong>Date:</strong> {Date.now()}</p>
      <p>{selectedBlog.body}</p>
    </div>
  );
};

export default BlogDetails;
