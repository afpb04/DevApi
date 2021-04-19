import { v4 as uuid } from 'uuid';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/schemas/User';
import IUserRepository from '../IUsersRepository';

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];
  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();
    let id: string;

    if (!id) {
      id = uuid();
    }

    Object.assign(user, {
      id,
      name,
      email,
      password,
    });
    this.users.push(user);
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    return user;
  }
}
export default UsersRepositoryInMemory;
