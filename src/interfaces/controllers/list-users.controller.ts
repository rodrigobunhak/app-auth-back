import { ListUsersUseCase } from "@/application/usecases/list-users.usecase";
import { SignInUserUseCase } from "@/application/usecases/sign-in-user.usecase";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class ListUsersController {
  constructor(
    @inject("ListUsersUseCase")
    private listUsersUseCase: ListUsersUseCase
  ) {}

  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.body;
      const success = await this.listUsersUseCase.execute({ page, limit });
      if (success) {
        res.status(200).json(success);
      } else {
        res.status(400).json({ message: "Failed to list users" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}