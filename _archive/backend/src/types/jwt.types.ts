export interface JWTPayload {
  patientId: string;
  email: string;
  iat?: number;
  exp?: number;
}

