import jwt from 'jsonwebtoken';

export const generateToken = (email: string, uid: string, expiresIn = '1h') => {
  return jwt.sign({ email, uid }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, 'secret') as jwt.JwtPayload;
};
