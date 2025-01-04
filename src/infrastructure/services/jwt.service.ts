import jwt from 'jsonwebtoken';
import { InvalidTokenError, TokenExpiredError } from '../errors/token.errors';

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '1d'
  }
};

export interface TokenService {
  generate(payload: object): string;
  verify(token: string): jwt.JwtPayload | string;
}

export class JWTService implements TokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = config.jwt.secret;
    this.expiresIn = config.jwt.expiresIn;
  }
  
  generate(payload: object): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn
    });
  }

  verify(token: string): jwt.JwtPayload | string {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredError();
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new InvalidTokenError();
      } else {
        throw new Error('Error verifying token');
      }
    }
  }
}