export interface Supplier {
  id: string;
  name: string;
  location: string;
  isVerify: boolean;
}
type TimeSlot = {
  date: string; // yyyy-MM-dd
  busy: {
    start: string; // "HH:mm"
    end: string;   // "HH:mm"
  }[];
};
