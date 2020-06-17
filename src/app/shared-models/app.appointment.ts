import { Doctor } from './app.doctor';
import { Patient } from './app.patient';

export interface Appointment {
  Id: number;
  DateTime: Date;
  DoctorId: number;
  DoctorName: string;
  PatientId: number;
  PatientName: string;
  note?: string;
}
