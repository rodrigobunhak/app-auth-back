import { Password } from '@/domain/entities/password.vo';
import * as bcrypt from 'bcrypt';

// Mock bcrypt para testes
jest.mock('bcrypt', () => ({
  hashSync: jest.fn().mockReturnValue('hashed_password'),
  compareSync: jest.fn().mockReturnValue(true)
}));

describe('Password Value Object Unit Test', () => {
  describe('create', () => {
    it('should create a valid password', () => {
      const password = Password.create('Test123!@#');
      expect(password).toBeInstanceOf(Password);
      expect(bcrypt.hashSync).toHaveBeenCalledWith('Test123!@#', 10);
    });

    it('should throw error if password length is less than 8', () => {
      expect(() => {
        Password.create('Test1!');
      }).toThrow('Password must be at least 8 characters long');
    });

    it('should throw error if password does not contain a number', () => {
      expect(() => {
        Password.create('TestTest!!');
      }).toThrow('Password must contain at least one number');
    });

    it('should throw error if password does not contain a special character', () => {
      expect(() => {
        Password.create('TestTest123');
      }).toThrow('Password must contain at least one special character');
    });

    it('should throw error if password does not contain an uppercase letter', () => {
      expect(() => {
        Password.create('test123!@#');
      }).toThrow('Password must contain at least one uppercase letter');
    });

    it('should throw error if password does not contain a lowercase letter', () => {
      expect(() => {
        Password.create('TEST123!@#');
      }).toThrow('Password must contain at least one lowercase letter');
    });
  });

  describe('compare', () => {
    it('should correctly compare passwords', () => {
      const password = Password.create('Test123!@#');
      const isValid = password.compare('Test123!@#');
      expect(isValid).toBe(true);
      expect(bcrypt.compareSync).toHaveBeenCalledWith('Test123!@#', 'hashed_password');
    });
  });

  describe('value', () => {
    it('should return the hashed password value', () => {
      const password = Password.create('Test123!@#');
      expect(password.value()).toBe('hashed_password');
    });
  });
});