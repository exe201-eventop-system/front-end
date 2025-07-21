import { UsedServiceStatus } from "../Services/Services.type";

export interface BookingHistoryDTO {
    id: string;
    serviceId: string;
    thumbnail: string;
    serviceName: string;
    status: UsedServiceStatus;
    supllierName: string;
    price: number;
    startTime: string;
    endTime: string;
    date: string;
}
