import AppError from '../../../../shared/errors/AppError';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Jon Doe',
      email: 'jondoe@exemple.com',
      password: '1234',
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with exist email', async () => {
    await createUserUseCase.execute({
      name: 'Jon Doe',
      email: 'jondoe1@exemple.com',
      password: '1234',
    });
    await expect(
      createUserUseCase.execute({
        name: 'Jon Doe',
        email: 'jondoe1@exemple.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email already exists!'));
  });
});
