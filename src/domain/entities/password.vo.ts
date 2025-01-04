import bcrypt from 'bcrypt';

export class Password {
  private _value: string;

  private constructor(value: string) {
    this._value = value;
  };

  private static validate(plainPassword: string): void {
    if (plainPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (!/\d/.test(plainPassword)) {
      throw new Error('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(plainPassword)) {
      throw new Error('Password must contain at least one special character');
    }
    if (!/[A-Z]/.test(plainPassword)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(plainPassword)) {
      throw new Error('Password must contain at least one lowercase letter');
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