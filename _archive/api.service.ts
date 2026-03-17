// Frontend API Service for backend integration

// Use environment variable or default to production backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://psychology-backend-production.up.railway.app/api';

// Debug: Log API URL (remove in production)
if (import.meta.env.DEV) {
  console.log('🔗 API Base URL:', API_BASE_URL);
  console.log('🔗 Environment VITE_API_URL:', import.meta.env.VITE_API_URL);
}

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
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      return {
        success: false,
        error: `Server returned non-JSON response: ${response.status} ${response.statusText}`,
      };
    }
    
    if (!response.ok) {
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        data,
        url: `${API_BASE_URL}${endpoint}`
      });
      return {
        success: false,
        error: data.error || `Error ${response.status}: ${response.statusText}`,
      };
    }
    
    return data;
  } catch (error) {
    console.error('API Network Error:', {
      error,
      url: `${API_BASE_URL}${endpoint}`,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    return {
      success: false,
      error: error instanceof Error 
        ? `Network error: ${error.message}. Please check your connection and backend URL.`
        : 'Network error. Please check your connection and try again.',
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

