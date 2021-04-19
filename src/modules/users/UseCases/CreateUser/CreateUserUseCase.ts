import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import User from '../../infra/typeorm/schemas/User';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Email already exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserUseCase;
