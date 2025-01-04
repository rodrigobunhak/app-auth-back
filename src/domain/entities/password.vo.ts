import bcrypt from 'bcrypt';
import { PasswordNoLowercaseError, PasswordNoNumberError, PasswordNoSpecialCharError, PasswordNoUppercaseError, PasswordTooShortError } from '../errors/password.errors';

export class Password {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  };

  private static validate(plainPassword: string): void {
    if (plainPassword.length < 8) {
      throw new PasswordTooShortError();
    }
    if (!/\d/.test(plainPassword)) {
      throw new PasswordNoNumberError();
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(plainPassword)) {
      throw new PasswordNoSpecialCharError();
    }
    if (!/[A-Z]/.test(plainPassword)) {
      throw new PasswordNoUppercaseError();
    }
    if (!/[a-z]/.test(plainPassword)) {
      throw new PasswordNoLowercaseError();
    }
  }

  public static create(plainPassword: string): Password {
    Password.validate(plainPassword);
    const hashedPassword = bcrypt.hashSync(plainPassword, 10);
    return new Password(hashedPassword);
  }

  public compare(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this._value);
  }

  public value(): string {
    return this._value;
  }
}