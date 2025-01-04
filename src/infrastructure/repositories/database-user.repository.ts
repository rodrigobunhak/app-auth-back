import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import { injectable } from "inversify";

@injectable()
export class DatabaseUserRepository implements UserRepository {
  
  async save(user: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
  async findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findAll(page: number, limit: number): Promise<{ users: User[]; total: number; }> {
    throw new Error("Method not implemented.");
  }
}