import { DomainError } from "./domain.error";

export class InvalidEmailFormatError extends DomainError {
  constructor() {
    super("Invalid email format", "INVALID_EMAIL_FORMAT");
  }
}

export class EmailTooLongError extends DomainError {
  constructor() {
    super("Email must not exceed 320 characters", "EMAIL_TOO_LONG");
  }
}

export class LocalPartTooLongError extends DomainError {
  constructor() {
    super("Local part of the email must not exceed 64 characters", "LOCAL_PART_TOO_LONG");
  }
}

export class DomainPartTooLongError extends DomainError {
  constructor() {
    super("Domain part of the email must not exceed 255 characters", "DOMAIN_PART_TOO_LONG");
  }
}