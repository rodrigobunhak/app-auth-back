import { UserRepository } from "@/domain/repositories/user.repository";
import { inject, injectable } from "inversify";

interface ListUsersUseCaseInput {
  page: number;
  limit: number;
}

interface ListUsersUseCaseOutput {
  users: {
    id: string;
    name: string;
    email: string;
  }[];
  total: number;
  totalPages: number;
  currentPage: number;
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(input: ListUsersUseCaseInput): Promise<ListUsersUseCaseOutput> {
    const { page, limit } = input;
    const { users, total } = await this.userRepository.findAll(page, limit);
    const totalPages = Math.ceil(total / limit);
    return {
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email.value(),
      })),
      total,
      totalPages,
      currentPage: page,
    };
  }
}