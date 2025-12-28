export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export interface Appointment {
  id: string;
  patientId: string;
  serviceId: string;
  dateTime: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAppointmentDTO {
  serviceId: string;
  dateTime: Date;
  notes?: string;
}

export interface UpdateAppointmentDTO {
  dateTime?: Date;
  status?: AppointmentStatus;
  notes?: string;
}

