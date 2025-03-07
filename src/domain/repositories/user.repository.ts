import { User } from "../entities/user.entity";

export interface UserRepository {
  save(user: User): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  findAll(page: number, limit: number): Promise<{ users: User[], total: number}>;
}