import { EmailAndPasswordRequiredError, InvalidCredentialsError } from "@/application/errors/user.errors";
import { SignInUserUseCase } from "@/application/usecases/sign-in-user.usecase";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class SignInUserController {
  constructor(
    @inject("SignInUserUseCase")
    private signInUserUseCase: SignInUserUseCase
  ) {}

  async signIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const success = await this.signInUserUseCase.execute({ email, password });
      if (success) {
        res.status(200).json(success);
      } else {
        res.status(400).json({ message: "Failed to sign in user" });
      }
    } catch (error) {
      switch (true) {
        case error instanceof InvalidCredentialsError:
          res.status(401).json({ message: error.message, code: error.code });
          return;
        case error instanceof EmailAndPasswordRequiredError:
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