import { InvalidTokenError, TokenExpiredError } from "@/infrastructure/errors/token.errors";
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
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
      }
      const token = authHeader.split(" ")[1];
      const decoded = this.tokenService.verify(token);
      req.user = decoded;
      next();
    } catch (error) {
      switch (true) {
        case error instanceof TokenExpiredError:
        case error instanceof InvalidTokenError:
          res.status(401).json({ message: error.message, code: error.code });
          return;
        case error instanceof Error:
          res.status(500).json({ message: "Internal server error" });
          return;
        default:
          res.status(500).json({ message: "Internal server error" });
          return;
      }
    }
  }
}