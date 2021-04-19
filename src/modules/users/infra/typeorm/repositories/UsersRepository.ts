import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../schemas/User';

class UsersRepository implements IUsersRepository {
  private repository: MongoRepository<User>;

  constructor() {
    this.repository = getMongoRepository(User);
  }
  async create({ name, email, password, id }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      id,
    });
    await this.repository.save(user);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}
export default UsersRepository;
