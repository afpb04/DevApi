import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import Connector from '../../infra/typeorm/schemas/Connector';
import IConnectorRepository from '../../repositories/IConnectorRepository';

interface IRequest {
  id: string;
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
class UpdateConnectorUseCase {
  constructor(
    @inject('ConnectorRepository')
    private connectorRepository: IConnectorRepository,
  ) {}

  async execute({
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
  }: IRequest): Promise<Connector> {
    const connector = await this.connectorRepository.findById(id);

    if (!connector) {
      throw new AppError('Connector does not exists!');
    }
    if (connector.user_id !== user_id) {
      throw new AppError('Connector does not exists!');
    }
    connector.name = name;
    connector.type = type;
    connector.privacy = privacy;
    connector.base_url = base_url;
    connector.logo_url = logo_url;
    connector.category = category;
    connector.description = description;
    connector.status = status;

    await this.connectorRepository.create(connector);

    return connector;
  }
}
export default UpdateConnectorUseCase;
