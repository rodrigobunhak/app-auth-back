import { UserRepository } from "@/domain/repositories/user.repository";
import { TokenService } from "@/infrastructure/services/jwt.service";
import { injectable, inject } from "inversify";
import { EmailAndPasswordRequiredError, InvalidCredentialsError } from "../errors/user.errors";

interface SignInUserUseCaseInput {
  email: string;
  password: string;
}

interface SignInUserUseCaseOutput {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    token: string;
    expires_in: number;
  } | null;
}

@injectable()
export class SignInUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository,
    @inject("TokenService")
    private tokenService: TokenService
  ) {}

  async execute(input: SignInUserUseCaseInput): Promise<SignInUserUseCaseOutput> {
    if (!input.email || !input.password) {
      throw new EmailAndPasswordRequiredError();
    }
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const isValidPassword = user.password.compare(input.password);
    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }
    const token = this.tokenService.generate({
      userId: user.id,
      email: user.email.value(),
    });
    return {
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email.value(),
        },
        token,
        expires_in: 86400,  // 1 dia em segundos (ajuste conforme necessário)
      },
    };
  }
}