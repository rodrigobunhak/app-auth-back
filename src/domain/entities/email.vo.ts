import { DomainPartTooLongError, EmailTooLongError, InvalidEmailFormatError, LocalPartTooLongError } from "../errors/email.errors";

export class Email {
  private _value: string;

  private constructor(value: string) {
    this._value = value;
  };

  private static validate(email: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new InvalidEmailFormatError();
    }
    if (/\.\./.test(email)) {
      throw new InvalidEmailFormatError();
    }
    if (email.length > 320) {
      throw new EmailTooLongError();
    }
    const [localPart, domainPart] = email.split('@');
    if (localPart.length > 64) {
      throw new LocalPartTooLongError();
    }
    if (domainPart.length > 255) {
      throw new DomainPartTooLongError();
    }
  }

  public static create(email: string): Email {
    Email.validate(email);
    return new Email(email);
  }

  public value(): string {
    return this._value;
  }
}