import { InfrastructureError } from "./infrastructure.error";

export class TokenExpiredError extends InfrastructureError {
  constructor() {
    super("Token expired", "TOKEN_EXPIRED");
  }
}

export class InvalidTokenError extends InfrastructureError {
  constructor() {
    super("Invalid token", "INVALID_TOKEN");
  }
}