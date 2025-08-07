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

export interface SignUpSupplierDTO {
    email: string;
    phoneNumber: string;
    location: string;
    nameOrganization: string;
    taxCode: string;
    description?: string;
    about?: string;
}

export interface SignUpLicenseSupplierDTO {
    id: string;
    businessLicense: File;
    thumnnail: File;
    formFiles: File[];
}

export interface SupplierProfileDTO {
    id: string; // Guid
    email: string;
    phoneNumber: string;
    location: string;
    nameOrginazation: string;
    description: string;
    about: string;
    businessLicense: string; // URL ảnh đã upload
    taxCode: string;
    thumnnail: string; // URL ảnh thumbnail
    orginazationImages: string[]; // Danh sách URL ảnh tổ chức
}
export interface ProcessRequestInspectorDTO {
    isAccept: boolean;
    id: string;       // Guid là string
    contract?: File;   // IFormFile tương ứng File trong JS, optional
}
