export interface PlaningStep1Request {
  name: string;
  description: string;
}

export type PlanningStatus = 'Planning' | 'Ongoing' | 'Completed'; // hoặc enum nếu bạn thích

export enum PlanningType {
  WEDDING = "WEDDING",
  BIRTHDAY = "BIRTHDAY",
  PARTY = "PARTY",
  CONFERENCE = "CONFERENCE",
  MEETING = "MEETING",
  TRAINING = "TRAINING",
  TEAM_BUILDING = "TEAM_BUILDING",
  OTHER = "OTHER"
}
export interface PlaningResponse {
  id: string;
  customerId: string;
  name: string;
  description: string;
  status: PlanningStatus;
  location: string;
  dateOfEvent: string;
  budget: number;
  aboutNumberPeople: string;
  mainColor: string;
  typeOfEvent: PlanningType;
  createAt: string;
  updateDate: string;
  sesstionServices: SesstionServices[]
}
export interface SesstionServices {
  id: string;
  planningId: string;
  serviceId: string;
}
export interface PlaningStep2Request {
  id: string;
  name: string;
  description: string;
  location: string;
  date_of_event: string;
  budget: number;
  about_number_people: string;
  main_color: string;
  type_of_event: PlanningType;
}

export interface numberPlaning {
  number: number;
}
export interface AddServiceRequest {
  planning_id: string;
  service_id: string;
}
export interface DeleteServiceRequest {
  sessionId: string;
}
export interface AiPlanningRes {
  id: string;
  customerId: string;
  name: string | null;
  description: string;
  status: number;
  location: string;
  dateOfEvent: string; // ISO format: yyyy-MM-ddTHH:mm:ss
  budget: number;
  aboutNumberPeople: number;
  mainColor: string; // Dạng: "#007bff, #28a745, #ffc107"
  typeOfEvent: string | null;
  sesstionServices: any | null; // Cần rõ kiểu nếu có schema cụ thể
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
  isDeleted: boolean;
}
