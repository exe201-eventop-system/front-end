export interface Suppliers {
    id: string;
    name: string;
    description: string;
    address: string;
    thumbnail: string
}
export interface SuppliersRating {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    location: string;
}


export interface SupplierDetailDTO {
    location: string;
    name_organization: string;
    description: string;
    thumbnail: string;
    is_active: boolean;
    images: string[];
}

export interface SupplierRatingDetailDto {
    supplier_id: string;
    ratings: SupplierRatingEntry[];
    average_rating: number;
}

export interface SupplierRatingEntry {
    user_id: string;
    user_name: string;
    create_at: string;
    user_avater: string; // Nếu là URL ảnh đại diện
    supplier_rating: number;
    supplier_comment: string;
}
