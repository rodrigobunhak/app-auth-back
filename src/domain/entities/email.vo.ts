export class Email {
  private _value: string;

  private constructor(value: string) {
    this._value = value;
  };

  private static validate(email: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    if (/\.\./.test(email)) {
      throw new Error('Invalid email format');
    }
    if (email.length > 320) {
      throw new Error('Email must not exceed 320 characters');
    }
    const [localPart, domainPart] = email.split('@');
    if (localPart.length > 64) {
      throw new Error('Local part of the email must not exceed 64 characters');
    }
    if (domainPart.length > 255) {
      throw new Error('Domain part of the email must not exceed 255 characters');
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