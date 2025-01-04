import "reflect-metadata";
import { Container } from "inversify";
import { UserRepository } from "@/domain/repositories/user.repository";
import { SignUpUserUseCase } from "@/application/usecases/sign-up-user.usecase";
import { SignInUserUseCase } from "@/application/usecases/sign-in-user.usecase";
import { SignUpUserController } from "@/interfaces/controllers/sign-up-user.controller";
import { SignInUserController } from "@/interfaces/controllers/sign-in-user.controller";
import { JWTService, TokenService } from "../services/jwt.service";
import { ListUsersUseCase } from "@/application/usecases/list-users.usecase";
import { ListUsersController } from "@/interfaces/controllers/list-users.controller";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";
import { AuthenticateTokenMiddleware } from "@/interfaces/middlewares/authenticate-token.middleware";
import { DatabaseUserRepository } from "../repositories/database-user.repository";

const container = new Container();

// Repositories
container.bind<UserRepository>("UserRepository").to(DatabaseUserRepository);
// container.bind<UserRepository>("UserRepository").to(InMemoryUserRepository).inSingletonScope();

// Usecases
container.bind<SignUpUserUseCase>("SignUpUserUseCase").to(SignUpUserUseCase);
container.bind<SignInUserUseCase>("SignInUserUseCase").to(SignInUserUseCase);
container.bind<ListUsersUseCase>("ListUsersUseCase").to(ListUsersUseCase);

// Controllers
container.bind<SignUpUserController>("SignUpUserController").to(SignUpUserController);
container.bind<SignInUserController>("SignInUserController").to(SignInUserController);
container.bind<ListUsersController>("ListUsersController").to(ListUsersController);

// Services
container.bind<TokenService>("TokenService").to(JWTService)
container.bind<AuthenticateTokenMiddleware>("AuthenticateTokenMiddleware").to(AuthenticateTokenMiddleware)

export { container };