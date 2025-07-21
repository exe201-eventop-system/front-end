export interface BusyTimeDto {
    start: string; // Định dạng "HH:mm"
    end: string;   // Định dạng "HH:mm"
}

export interface TimeSlotDto {
    date: string;         // Định dạng "yyyy-MM-dd"
    busy: BusyTimeDto[];  // Danh sách các khoảng thời gian đã bận trong ngày
}
