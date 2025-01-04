import { SignUpUserUseCase } from "@/application/usecases/sign-up-user.usecase";
import { DomainPartTooLongError, EmailTooLongError, InvalidEmailFormatError, LocalPartTooLongError } from "@/domain/errors/email.errors";
import { PasswordNoLowercaseError, PasswordNoNumberError, PasswordNoSpecialCharError, PasswordNoUppercaseError, PasswordTooShortError } from "@/domain/errors/password.errors";
import { UserEmailRequiredError, UserNameRequiredError, UserPasswordRequiredError } from "@/domain/errors/user.errors";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class SignUpUserController {
  constructor(
    @inject("SignUpUserUseCase")
    private signUpUserUseCase: SignUpUserUseCase
  ) {}

  async signUp(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    try {
      const success = await this.signUpUserUseCase.execute({ name, email, password });
      if (success) {
        res.status(200).json({ message: "User signed out successfully" });
      } else {
        res.status(400).json({ message: "Failed to sign out user" });
      }
    } catch (error) {
      switch (true) {
        case error instanceof UserNameRequiredError:
        case error instanceof UserEmailRequiredError:
        case error instanceof UserPasswordRequiredError:
        case error instanceof PasswordTooShortError:
        case error instanceof PasswordNoNumberError:
        case error instanceof PasswordNoSpecialCharError:
        case error instanceof PasswordNoUppercaseError:
        case error instanceof PasswordNoLowercaseError:
        case error instanceof InvalidEmailFormatError:
        case error instanceof EmailTooLongError:
        case error instanceof LocalPartTooLongError:
        case error instanceof DomainPartTooLongError:
          res.status(400).json({ message: error.message, code: error.code });
          return;
        case error instanceof Error:
          res.status(500).json({ message: "Internal server error" });
          return;
        default:
          res.status(500).json({ message: "Internal server error" });
          return;
      }
    }
  }
}