export interface UsedService {
    price: number;
    services: Service[]
}
export interface Service {
    event_id?: string;
    service_name: string;
    service_id: string;
    supplier_id: string;
    phone: string;
    customer_name?: string;
    supplier_name: string;
    thumbnail_service: string;
    location: string;
    rent_start_time: string;
    rent_end_time: string;
    price: number;
}
export interface PaymentParams {
    code: string;
    id: string;
    cancel: string;
    status: string;
    orderCode: string;
}
export interface TransactionItem {
    serviceName?: string;
    supplierName?: string;
    unitPrice?: number;
    createdAt: string;
}

export interface TransactionDTOs {
    orderCode: number;
    customerName?: string;
    supplierName?: string;
    price?: number;
    status?: boolean;
    isComplete: boolean;
    createdAt: string; // ISO string
    transactionItems?: TransactionItem[];
}
