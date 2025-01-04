import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import { injectable } from "inversify";

@injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<boolean> {
    const existingUser = this.users.find(u => u.email.value() === user.email.value());
    if (existingUser) {
      Object.assign(existingUser, user);
    } else {
      this.users.push(user);
    }
    return true;
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email.value() === email);
    if (!user) return null;
    return user;
  }

  async findAll(page: number, limit: number): Promise<{ users: User[]; total: number; }> {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedUsers = this.users.slice(start, end);
    return { users: paginatedUsers, total: this.users.length };
  }
}