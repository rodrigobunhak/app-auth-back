import { DomainError } from "./domain.error";

export class UserNameRequiredError extends DomainError {
  constructor() {
    super("User name is required", "USER_NAME_REQUIRED");
  }
}

export class UserEmailRequiredError extends DomainError {
  constructor() {
    super("User email is required", "USER_EMAIL_REQUIRED");
  }
}

export class UserPasswordRequiredError extends DomainError {
  constructor() {
    super("User password is required", "USER_PASSWORD_REQUIRED");
  }
}