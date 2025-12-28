export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  priceUSD: number; // cents
  priceEUR: number;
  priceARS: number;
  priceMXN: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateServiceDTO {
  name: string;
  description: string;
  duration: number;
  priceUSD: number;
  priceEUR: number;
  priceARS: number;
  priceMXN: number;
}

export interface UpdateServiceDTO {
  name?: string;
  description?: string;
  duration?: number;
  priceUSD?: number;
  priceEUR?: number;
  priceARS?: number;
  priceMXN?: number;
  isActive?: boolean;
}

