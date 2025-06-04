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
  createAt: string; // hoặc Date nếu bạn parse
  updateDate: string;
}

export interface PlaningStep2Request {
  id: string;
  name: string;
  description: string;
  location: string;
  dateOfEvent: string;
  budget: number;
  aboutNumberPeople: string;
  mainColor: string;
  typeOfEvent: PlanningType;
}

export interface numberPlaning {
  number: number;
}
