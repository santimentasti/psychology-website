// Frontend API Service for backend integration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Generic fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('authToken');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'An error occurred',
      };
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

// Auth Service
export const authService = {
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth?: string;
    address?: string;
  }) {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(email: string, password: string) {
    const response = await apiFetch<{ patient: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  },

  async getProfile() {
    return apiFetch('/auth/profile', {
      method: 'GET',
    });
  },

  logout() {
    localStorage.removeItem('authToken');
  },
};

// Services Service
export const servicesService = {
  async getAll() {
    return apiFetch('/services', {
      method: 'GET',
    });
  },

  async getById(id: string) {
    return apiFetch(`/services/${id}`, {
      method: 'GET',
    });
  },
};

// Appointments Service
export const appointmentsService = {
  async getAll(params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
    serviceId?: string;
  }) {
    const queryString = params 
      ? '?' + new URLSearchParams(params as any).toString()
      : '';
    
    return apiFetch(`/appointments${queryString}`, {
      method: 'GET',
    });
  },

  async getById(id: string) {
    return apiFetch(`/appointments/${id}`, {
      method: 'GET',
    });
  },

  async getAvailableSlots(date: string, serviceId: string) {
    return apiFetch(
      `/appointments/available-slots?date=${date}&serviceId=${serviceId}`,
      { method: 'GET' }
    );
  },

  async create(data: {
    serviceId: string;
    dateTime: string;
    notes?: string;
  }) {
    return apiFetch('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: {
    dateTime?: string;
    status?: string;
    notes?: string;
  }) {
    return apiFetch(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async cancel(id: string) {
    return apiFetch(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Payments Service
export const paymentsService = {
  async createIntent(data: {
    serviceId: string;
    currency: string;
    paymentMethod: 'STRIPE' | 'PAYPAL';
    appointmentId?: string;
    packageType?: string;
  }) {
    return apiFetch('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async confirmPayment(id: string, paymentIntentId: string) {
    return apiFetch(`/payments/${id}/confirm`, {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId }),
    });
  },

  async getAll() {
    return apiFetch('/payments', {
      method: 'GET',
    });
  },

  async getById(id: string) {
    return apiFetch(`/payments/${id}`, {
      method: 'GET',
    });
  },
};

// Patient Service
export const patientService = {
  async getProfile() {
    return apiFetch('/patients/profile', {
      method: 'GET',
    });
  },

  async updateProfile(data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    address?: string;
  }) {
    return apiFetch('/patients/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async changePassword(currentPassword: string, newPassword: string) {
    return apiFetch('/patients/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  async getStatistics() {
    return apiFetch('/patients/statistics', {
      method: 'GET',
    });
  },

  async getDocuments() {
    return apiFetch('/patients/documents', {
      method: 'GET',
    });
  },

  async uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('document', file);

    const token = localStorage.getItem('authToken');
    
    try {
      const response = await fetch(`${API_BASE_URL}/patients/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: 'Failed to upload document',
      };
    }
  },

  async deleteDocument(id: string) {
    return apiFetch(`/patients/documents/${id}`, {
      method: 'DELETE',
    });
  },
};

// Export all services
export default {
  auth: authService,
  services: servicesService,
  appointments: appointmentsService,
  payments: paymentsService,
  patient: patientService,
};

