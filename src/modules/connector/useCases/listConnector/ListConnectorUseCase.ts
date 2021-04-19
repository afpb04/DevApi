import { inject, injectable } from 'tsyringe';

import Connector from '../../infra/typeorm/schemas/Connector';
import IConnectorRepository from '../../repositories/IConnectorRepository';

interface IRequest {
  user_id: string;
  name?: string;
  category?: string;
  privacy?: string;
  type?: string;
}

@injectable()
class ListConnectorUseCase {
  constructor(
    @inject('ConnectorRepository')
    private connectorRepository: IConnectorRepository,
  ) {}
  async execute({
    user_id,
    name,
    category,
    privacy,
    type,
  }: IRequest): Promise<Connector[]> {
    const connectors = await this.connectorRepository.list(
      user_id,
      name,
      category,
      privacy,
      type,
    );

    return connectors;
  }
}
export default ListConnectorUseCase;
