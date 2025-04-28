import { Blog } from "../../types/Blog.type";
import { createGetThunk } from "../genericsCreateThunk";  // Giữ nguyên cách tạo thunk
import { toast } from 'react-toastify';

// Thunk cho lấy tất cả các bài viết blog
export const Blogs = createGetThunk<Blog[], void>(  // Tham số đầu tiên là kiểu dữ liệu trả về (Blog[]), thứ hai là kiểu payload (void)
    `posts/fetchAll`,  // Tên action type cho danh sách blog
    `posts`,  // URL endpoint cho danh sách blog
    {
        onError: (msg) => toast.error(`Lấy blog thất bại: ${msg}`),  // Xử lý lỗi khi lấy danh sách blog
    }
);

// Thunk cho lấy chi tiết của một bài viết blog
export const BlogDetail = createGetThunk<Blog, { id: string }>(  // Tham số đầu tiên là kiểu dữ liệu trả về (Blog), thứ hai là kiểu payload ({ id: string })
    `posts/fetchDetail`,  
    `posts`,  
    {
        buildUrl: (payload) => `posts/${payload.id}`,  
        onError: (msg) => toast.error(`Lấy blog thất bại: ${msg}`),  
    }
);
