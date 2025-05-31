export interface PlaningStep1Request {
  name: string;
  description: string;
}

export type PlanningStatus = 'Planning' | 'Ongoing' | 'Completed'; // hoặc enum nếu bạn thích

export interface PlaningResponse {
  id: string;
  customerId: string;
  name: string;
  description: string;
  status: PlanningStatus;
  location: string;
  dateOfEvent: string; // ISO string
  budget: number;
  aboutNumberPeople: string;
  mainColor: string;
  typeOfEvent: string;
  createAt: string; // hoặc Date nếu bạn parse
  updateDate: string;
}

export interface numberPlaning {
  number: number;
}
