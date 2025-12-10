import jwt, { SignOptions, Secret } from 'jsonwebtoken';

const signOptions: SignOptions = { expiresIn: '24h' };

export const generateToken = (payload: object): string => {
  const secret: Secret = process.env.JWT_SECRET || 'eb97d3c5366dd35a6e3028b6546ef7f03b0aaf7c';
  return jwt.sign(payload, secret, signOptions);
};

export const verifyToken = (token: string): any => {
  const secret: Secret = process.env.JWT_SECRET || 'eb97d3c5366dd35a6e3028b6546ef7f03b0aaf7c';
  return jwt.verify(token, secret);
};
