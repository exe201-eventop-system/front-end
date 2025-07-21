import { Pagination } from "../Pagination/Pagination.type";

export interface SupplierFilter extends Pagination {
    search_key?: string;
    address?: string;
}