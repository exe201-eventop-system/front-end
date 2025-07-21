export interface GetAllBlogQuery {
    Page?: number;
    PageSize?: number;
    TitleContain?: string;
}


export interface GetBlogDetailQuery {
    BlogId: string; // uuid
}

// ✍️ Commands

export interface CreateBlogCommand {
    title?: string;
    description?: string;
    userId?: string; // Gán ở backend (Guid.NewGuid() hoặc lấy từ token)
}

export interface UpdateBlogCommand {
    blogId: string;
    title?: string;
    description?: string;
}

export interface DeleteBlogCommand {
    id: string;
}

export interface UploadBlogImageCommand {
    blogId: string;
    // FE phải gửi dưới dạng FormData
    images: File[]; // map với IFormFile[] bên BE
}

export interface UpdateBlogImageCommand {
    blogId: string;
    images: File[]; // map với IFormFile[] bên BE
}

export interface BlogQueryResult {
    id: string;
    title?: string;
    description?: string;
    thumbnail?: string;
    supplier_id: string;
    created_at: string;
    update_at: string;
}

export interface BlogDetailResult extends BlogQueryResult {
    images?: string[];
}

export interface CreateBlogResult {
    id: string;
    title?: string;
    description?: string;
}

export interface UpdateBlogResult {
    title?: string;
    description?: string;
}

export interface UploadBlogImageResult {
    images?: string[];
    total: number;
    image_ids?: string[];
}

export interface UpdateBlogImageResult {
    images?: string[];
    total: number;
    image_ids?: string[];
}


