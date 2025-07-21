export interface Feedback {
  customer_name: string;
  service_rating: number;
  service_comment: string;
  created_at: string;
}

export interface Supplier {
  id: string;
  avatar: string;
  location: string;
  name: string;
  is_active: boolean | string;
  rating: number;
  total_service: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  location: string;
  images?: string[];
  packages?: rentalOption[];
  supplier: Supplier;
  rating: number;
  feedbacks: Feedback[];
}

export interface Services {
  id: string;
  name: string;
  thumbnail: string;
  description: string
  rating: number;
  category: string;
  package?: rentalOption[];
  supplier: Supplier;
  average_rating: number;
  feedbacks: Feedback[];
}
export interface rentalOption {
  package_name: string,
  price: number
}
export interface Pakage {
  id: string;
  name: string;
  description: string;
}
export interface Supplier {
  supplier_id: string;
  avatar: string;
  location: string;
  name: string;
  is_active: boolean | string;
  rating: number;
  total_service: number;
}

export interface GetServicesQuery {
  page?: number;
  page_size?: number;
  search?: string;
  package_name?: string;
}

export interface Categories {
  id: string;
  name: string;
  description: string;
  parent_id: string | null;
}
export interface ServiceRating {
  user_id: string;
  user_name: string;
  user_avater: string;
  service_rating: number;
  service_comment: string;
}

export interface ServiceRatingDetailDto {
  service_id: string;
  ratings: ServiceRating[];
  average_rating: number;
}
export enum UsedServiceStatus {
  Registered,
  Returned
}