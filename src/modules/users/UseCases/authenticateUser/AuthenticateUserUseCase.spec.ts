import AppError from '../../../../shared/errors/AppError';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from '../CreateUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'Jon Doe',
      email: 'jondoe@exemple.com',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });
  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'jon@exemple.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with incorrect password', async () => {
    await expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Jon Doe',
        email: 'jondoe2@exemple.com',
        password: '1234',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: '12345',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
