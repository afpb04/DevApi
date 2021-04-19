import ICreateConnectorDTO from '../dtos/ICreateConnectorDTO';
import Connector from '../infra/typeorm/schemas/Connector';

interface IConnectorRepository {
  list(
    user_id: string,
    name?: string,
    category?: string,
    privacy?: string,
    type?: string,
  ): Promise<Connector[]>;
  create(data: ICreateConnectorDTO): Promise<Connector>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Connector>;
}
export default IConnectorRepository;
