export const JWT_CONFIG: {
  secret: string;
  expiresIn: string;
  issuer: string;
  audience: string;
} = {
  secret: process.env.JWT_SECRET || 'change-this-secret-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  issuer: process.env.JWT_ISSUER || 'psychology-practice-api',
  audience: process.env.JWT_AUDIENCE || 'psychology-practice-client',
};

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'change-this-secret-in-production') {
  console.warn('⚠️  WARNING: Using default JWT secret. Change JWT_SECRET in production!');
}

