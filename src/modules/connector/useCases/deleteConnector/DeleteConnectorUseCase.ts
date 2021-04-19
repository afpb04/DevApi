import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import IConnectorRepository from '../../repositories/IConnectorRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteConnectorUseCase {
  constructor(
    @inject('ConnectorRepository')
    private connectorRepository: IConnectorRepository,
  ) {}
  async execute({ id }: IRequest): Promise<void> {
    const connector = await this.connectorRepository.findById(id);
    if (!connector) {
      throw new AppError('Connector does not exists!');
    }
    await this.connectorRepository.delete(id);
  }
}
export default DeleteConnectorUseCase;
