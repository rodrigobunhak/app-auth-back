import { Email } from "@/domain/entities/email.vo";

describe('Email Value Object Unit Test', () => {
  describe('create', () => {
    it('should create a valid email', () => {
      const email = Email.create('rodrigo@teste.com.br');
      expect(email).toBeInstanceOf(Email);
    });

    it('should throw an error for "plainaddress"', () => {
      const invalidEmail = 'plainaddress';
      expect(() => Email.create(invalidEmail)).toThrow('Invalid email format');
    });
  
    it('should throw an error for "@missingusername.com"', () => {
      const invalidEmail = '@missingusername.com';
      expect(() => Email.create(invalidEmail)).toThrow('Invalid email format');
    });
  
    it('should throw an error for "username@.com"', () => {
      const invalidEmail = 'username@.com';
      expect(() => Email.create(invalidEmail)).toThrow('Invalid email format');
    });
  
    it('should throw an error for "username@domain"', () => {
      const invalidEmail = 'username@domain';
      expect(() => Email.create(invalidEmail)).toThrow('Invalid email format');
    });
  
    it('should throw an error for "username@domain..com"', () => {
      const invalidEmail = 'username@domain..com';
      expect(() => Email.create(invalidEmail)).toThrow('Invalid email format');
    });

    it('should throw an error if the email exceeds 320 characters', () => {
      const longEmail = 'a'.repeat(64) + '@' + 'b'.repeat(255) + '.com';
      expect(() => Email.create(longEmail)).toThrow('Email must not exceed 320 characters');
    });

    it('should throw an error if the local part exceeds 64 characters', () => {
      const longLocalPart = 'a'.repeat(65) + '@example.com';
      expect(() => Email.create(longLocalPart)).toThrow('Local part of the email must not exceed 64 characters');
    });
  
    it('should throw an error if the domain part exceeds 255 characters', () => {
      const longDomainPart = 'user@' + 'b'.repeat(256) + '.com';
      expect(() => Email.create(longDomainPart)).toThrow('Domain part of the email must not exceed 255 characters');
    });
  
    it('should throw an error for an email with spaces', () => {
      const emailWithSpaces = 'user name@example.com';
      expect(() => Email.create(emailWithSpaces)).toThrow('Invalid email format');
    });
  
    it('should throw an error for an empty email', () => {
      expect(() => Email.create('')).toThrow('Invalid email format');
    });
  });

  // describe('compare', () => {
  //   it('should correctly compare passwords', () => {
  //     const password = Password.create('Test123!@#');
  //     const isValid = password.compare('Test123!@#');
  //     expect(isValid).toBe(true);
  //     expect(bcrypt.compareSync).toHaveBeenCalledWith('Test123!@#', 'hashed_password');
  //   });
  // });

  // describe('value', () => {
  //   it('should return the hashed password value', () => {
  //     const password = Password.create('Test123!@#');
  //     expect(password.value()).toBe('hashed_password');
  //   });
  // });
});