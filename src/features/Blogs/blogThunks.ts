import { BlogDetailResult, BlogQueryResult, GetAllBlogQuery } from "../../types/Blogs/Blog.type";
import { PaginationResult } from "../../types/Generict/PaginationResult.type";
import { createGetThunk } from "../genericsCreateThunk";

export const getAllBlog = createGetThunk<PaginationResult<BlogQueryResult>, GetAllBlogQuery>(
    `blogs/`,
    `blogs`,
    {
        buildUrl: (payload) => `blogs?Page=${payload.Page}&PageSize=${payload.PageSize}&TitleContain=${payload.TitleContain}`,
    }
);

// Thunk cho lấy chi tiết của một bài viết blog
export const getBlogDetail = createGetThunk<BlogDetailResult, { id: string }>(  // Tham số đầu tiên là kiểu dữ liệu trả về (BlogQueryResult), thứ hai là kiểu payload ({ id: string })
    `posts/fetchDetail`,
    `posts`,
    {
        buildUrl: (payload) => `blogs/${payload.id}`,
    }
);
