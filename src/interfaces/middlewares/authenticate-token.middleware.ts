import { TokenService } from "@/infrastructure/services/jwt.service";
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

@injectable()
export class AuthenticateTokenMiddleware {
  constructor(
    @inject("TokenService")
    private tokenService: TokenService
  ) {}

  execute(req: AuthRequest, res: Response, next: NextFunction): Response | void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = this.tokenService.verify(token);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  }
}