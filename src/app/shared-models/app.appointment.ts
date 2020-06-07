import { Doctor } from './app.doctor';
import { Patient } from './app.patient';

export interface Appointment {
  Id: number;
  DateTime: Date;
  doctorId: number;
  patientId: number;
  note?: string;
}
