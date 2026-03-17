export const CURRENCIES = ['USD', 'EUR', 'ARS', 'MXN'] as const;
export type Currency = typeof CURRENCIES[number];

export const PACKAGE_TYPES = {
  MONTHLY_4: 'monthly-4',
  MONTHLY_8: 'monthly-8',
  PREPAID_10: 'prepaid-10'
} as const;

export type PackageType = typeof PACKAGE_TYPES[keyof typeof PACKAGE_TYPES];

