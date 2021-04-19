import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateConnectorDTO from '../../../dtos/ICreateConnectorDTO';
import IConnectorRepository from '../../../repositories/IConnectorRepository';
import Connector from '../schemas/Connector';

class ConnectorRepository implements IConnectorRepository {
  private repository: MongoRepository<Connector>;
  constructor() {
    this.repository = getMongoRepository(Connector);
  }
  async create({
    id,
    name,
    type,
    privacy,
    base_url,
    logo_url,
    category,
    description,
    status,
    user_id,
  }: ICreateConnectorDTO): Promise<Connector> {
    const connector = this.repository.create({
      id,
      name,
      type,
      privacy,
      base_url,
      logo_url,
      category,
      description,
      status,
      user_id,
    });
    await this.repository.save(connector);

    return connector;
  }
  async list(
    user_id: string,
    name?: string,
    category?: string,
    privacy?: string,
    type?: string,
  ): Promise<Connector[]> {
    let connector: Connector[];
    if (name) {
      connector = await this.repository.find({
        where: {
          user_id,
          name,
        },
      });
      return connector;
    }
    if (category) {
      connector = await this.repository.find({
        where: {
          user_id,
          category,
        },
      });
      return connector;
    }
    if (privacy) {
      connector = await this.repository.find({
        where: {
          user_id,
          privacy,
        },
      });
      return connector;
    }
    if (type) {
      connector = await this.repository.find({
        where: {
          user_id,
          type,
        },
      });
      return connector;
    }
    connector = await this.repository.find({ user_id });
    return connector;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async findById(id: string): Promise<Connector> {
    const connector = await this.repository.findOne(id);
    return connector;
  }
}
export default ConnectorRepository;
