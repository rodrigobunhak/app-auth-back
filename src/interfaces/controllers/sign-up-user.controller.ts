import { SignUpUserUseCase } from "@/application/usecases/sign-up-user.usecase";
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
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}