import { number } from "framer-motion";

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    description: string;
    category: string;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Carts {
    cartId: string;
    content: itemCart[]
}

export interface itemCart {
    supllierId: string;
    supllierName: string;
    cartItem: string;
    serviceId: string;
    thumbnail: string;
    serviceName: string;
    category: string;
    rentalOptions?: rentalOption[];
    bookingInfo?: BookingInfo;
}

export interface rentalOption {
    package_name: string,
    price: number
    minimum_hours: number
    overtime_price: number
}

// New types for booking system
export interface TimeSlot {
    id: string;
    time: string; // Format: "HH:mm"
    isAvailable: boolean;
    isBooked: boolean;
}

export interface WorkingDay {
    date: string; // Format: "YYYY-MM-DD"
    dayOfWeek: string; // "Monday", "Tuesday", etc.
    isWorkingDay: boolean;
    timeSlots: TimeSlot[];
}

export interface SupplierSchedule {
    supplierId: string;
    workingDays: WorkingDay[];
    workingHours: {
        start: string; // "09:00"
        end: string; // "18:00"
    };
    breakTime?: {
        start: string;
        end: string;
    };
}

export interface BookingInfo {
    selectedDate: string;
    selectedTime: string;
    selectedPackage?: string;
    duration?: number; // in minutes
    notes?: string;
}

export interface ServiceBooking {
    serviceId: string;
    supplierId: string;
    packageId?: string;
    bookingInfo: BookingInfo;
}