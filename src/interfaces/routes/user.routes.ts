import { Router, Request, Response } from 'express';
import { container } from '@/infrastructure/config/inversify.config';
import { SignUpUserController } from '../controllers/sign-up-user.controller';
import { SignInUserController } from '../controllers/sign-in-user.controller';
import { ListUsersController } from '../controllers/list-users.controller';
import { AuthenticateTokenMiddleware } from '../middlewares/authenticate-token.middleware';

const userRouter = Router();
const signUpUserController = container.get<SignUpUserController>("SignUpUserController");
const signInUserController = container.get<SignInUserController>("SignInUserController");
const listUsersController = container.get<ListUsersController>("ListUsersController");
const authenticateTokenMiddleware = container.get<AuthenticateTokenMiddleware>("AuthenticateTokenMiddleware");

userRouter.use("/users", (req, res, next) => authenticateTokenMiddleware.execute(req, res, next));

// Public routes
userRouter.post('/signup', (req: Request, res: Response) => signUpUserController.signUp(req, res));
userRouter.post('/signin', (req: Request, res: Response) => signInUserController.signIn(req, res));

// Private routes
userRouter.get("/users", (req, res) => listUsersController.listUsers(req, res));

export { userRouter };