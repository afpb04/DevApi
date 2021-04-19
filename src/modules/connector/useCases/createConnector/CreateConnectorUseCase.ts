import { inject, injectable } from 'tsyringe';

import Connector from '../../infra/typeorm/schemas/Connector';
import IConnectorRepository from '../../repositories/IConnectorRepository';

interface IRequest {
  name: string;
  type: string;
  privacy: string;
  base_url: string;
  logo_url: string;
  category: string;
  description: string;
  status: string;
  user_id: string;
}

@injectable()
class CreateConnectorUseCase {
  constructor(
    @inject('ConnectorRepository')
    private connectorRepository: IConnectorRepository,
  ) {}
  async execute({
    name,
    type,
    privacy,
    base_url,
    category,
    description,
    logo_url,
    status,
    user_id,
  }: IRequest): Promise<Connector> {
    const connector = await this.connectorRepository.create({
      name,
      type,
      privacy,
      base_url,
      category,
      description,
      logo_url,
      status,
      user_id,
    });
    return connector;
  }
}

export default CreateConnectorUseCase;
