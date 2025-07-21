export interface ScheduleSupplier {
    title: string;
    start: Date;
    end: Date;
    resource: ServiceDto;
}

export interface ServiceDto {
    serviceName: string;
    customerName: string;
    phone: string;
    status?: string;
    image: string;
    location: string;
    supplier: string;
}
