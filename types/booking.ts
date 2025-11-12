import { BOOKING_BRANCHES, SERVICE_TYPES } from "@/constants/booking";

export type BookingBranch = (typeof BOOKING_BRANCHES)[number];
export type ServiceType = (typeof SERVICE_TYPES)[number];

export interface BookingFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientDOB?: string;
  branch: BookingBranch;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: ServiceType;
}
