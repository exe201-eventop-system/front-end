import  { useRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../features/store'; 
import { Blogs } from '../../features/Blogs/blogThunks';
import { Link } from 'react-router-dom';
//import { Blogs } from '../../features/Blogs/blogThunks';

const BlogList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blog);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current && blogs.length === 0) {
      dispatch(Blogs());
      hasFetched.current = true;
    }
  }, [dispatch, blogs.length]);

console.log(`blog`,blogs);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <>
              <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              <div>{blog.body}</div>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BlogList;
