export interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePatientDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
}

export interface UpdatePatientDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
}

import { Appointment } from './appointment.types.js';

export interface PatientWithAppointments extends Patient {
  appointments: Appointment[];
}

