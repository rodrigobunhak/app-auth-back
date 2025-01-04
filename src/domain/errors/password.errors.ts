import { DomainError } from "./domain.error";

export class PasswordTooShortError extends DomainError {
  constructor() {
    super("Password must be at least 8 characters long", "PASSWORD_TOO_SHORT");
  }
}

export class PasswordNoNumberError extends DomainError {
  constructor() {
    super("Password must contain at least one number", "PASSWORD_NO_NUMBER");
  }
}

export class PasswordNoSpecialCharError extends DomainError {
  constructor() {
    super("Password must contain at least one special character", "PASSWORD_NO_SPECIAL_CHAR");
  }
}

export class PasswordNoUppercaseError extends DomainError {
  constructor() {
    super("Password must contain at least one uppercase letter", "PASSWORD_NO_UPPERCASE");
  }
}

export class PasswordNoLowercaseError extends DomainError {
  constructor() {
    super("Password must contain at least one lowercase letter", "PASSWORD_NO_LOWERCASE");
  }
}