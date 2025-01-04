import jwt from 'jsonwebtoken';

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
    return jwt.verify(token, this.secret);
  }

}