export interface StatItem {
    title: string;
    value: string;
    change: string;
}

export interface MonthlyRevenueItem {
    name: string;
    revenue: number;
}

export interface UserGrowthItem {
    month: string;
    users: number;
}

export interface SupplierGrowthItem {
    month: string;
    suppliers: number;
}

export interface EventTypeItem {
    name: string;
    value: number;
}

export interface TopServiceItem {
    name: string;
    rental_count: number;
}

export interface LeastRatedServiceItem {
    name: string;
    negative_feedback_count: number;
}

export interface AnalyticsData {
    stats: StatItem[];
    monthlyRevenue: MonthlyRevenueItem[];
    userGrowth: UserGrowthItem[];
    supplierGrowth: SupplierGrowthItem[];
    eventTypes: EventTypeItem[];
    topServices: TopServiceItem[];
    leastRatedServices: LeastRatedServiceItem[];
}
export interface RevenueDto {
    month: string;
    revenue: number;
}
export interface FeedbackQuestionAnswer {
    user_id: string;        // Guid -> string
    username: string;
    answer_text: string;
}

export interface SystemFeedbackGroup {
    question_id: string;                // Guid -> string
    question_text: string;
    answers: FeedbackQuestionAnswer[];
}
// types/dashboard.dto.ts

export interface LifetimeDataDto {
    used_service_count: number;
    service_count: number;
    event_count: number;
    customer_count: number;
    supplier_count: number;
    blog_count: number;
    lifetime_revenue: number;
}

export interface MonthlyDataDto {
    month: number;
    data: LifetimeDataDto;
}

export interface YearlyDataDto {
    year: number;
    data: LifetimeDataDto;
    data_month: MonthlyDataDto[];
}

export interface MostRatedServiceDto {
    service_id: string;
    service_name: string;
    supplier_id: string;
    supplier_name: string;
    uses_count: number;
}

export interface LeastRatedServiceDto {
    service_id: string;
    service_name: string;
    negative_feedback_count: number;
}

export interface DashboardResponseDto {
    request_time: string; // ISO date string
    lifetime: LifetimeDataDto;
    yearly: YearlyDataDto;
    most_rated_service: MostRatedServiceDto[];
    least_rated_service: LeastRatedServiceDto[];
}
export interface DashboardStatDTO {
    name: string;
    value: string;
}

export interface MonthlyRevenueDTO {
    name: string;
    value: number;
}

export interface DashboardSupplierDTO {
    stats: DashboardStatDTO[];
    monthlyRevenue: MonthlyRevenueDTO[];
}
