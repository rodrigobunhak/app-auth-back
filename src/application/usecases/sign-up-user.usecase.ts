import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import { injectable, inject } from "inversify";

interface SignUpUserUseCaseInput {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class SignUpUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async execute(input: SignUpUserUseCaseInput): Promise<boolean> {
    const user = User.create({
      name: input.name,
      email: input.email,
      password: input.password,
    })
    return await this.userRepository.save(user);
  }
}