import { v4 as uuid } from 'uuid';

import ICreateConnectorDTO from '../../dtos/ICreateConnectorDTO';
import Connector from '../../infra/typeorm/schemas/Connector';
import IConnectorRepository from '../IConnectorRepository';

class ConnectorRepositoryInMemory implements IConnectorRepository {
  connectors: Connector[] = [];
  async list(
    user_id: string,
    name?: string,
    category?: string,
    privacy?: string,
    type?: string,
  ): Promise<Connector[]> {
    let connectors;
    if (name) {
      connectors = this.connectors.filter(
        connector => connector.name === name && connector.user_id === user_id,
      );
      return connectors;
    }
    if (category) {
      connectors = this.connectors.filter(
        connector =>
          connector.category === category && connector.user_id === user_id,
      );
      return connectors;
    }
    if (privacy) {
      connectors = this.connectors.filter(
        connector =>
          connector.privacy === privacy && connector.user_id === user_id,
      );
      return connectors;
    }
    if (type) {
      connectors = this.connectors.filter(
        connector => connector.type === type && connector.user_id === user_id,
      );
      return connectors;
    }
    connectors = this.connectors.filter(
      connector => connector.user_id === user_id,
    );
    return connectors;
  }
  async create({
    id,
    user_id,
    type,
    status,
    base_url,
    category,
    description,
    logo_url,
    name,
    privacy,
  }: ICreateConnectorDTO): Promise<Connector> {
    const connector = new Connector();
    let connectorId: string;
    if (!id) {
      connectorId = uuid();
    }
    Object.assign(connector, {
      id: connectorId,
      user_id,
      type,
      status,
      base_url,
      category,
      description,
      logo_url,
      name,
      privacy,
    });

    this.connectors.push(connector);
    return connector;
  }
  async delete(id: string): Promise<void> {
    const connectorIndex = this.connectors.findIndex(
      connector => String(connector.id) === id,
    );
    this.connectors.splice(connectorIndex, 1);
  }
  async findById(id: string): Promise<Connector> {
    const connector = this.connectors.find(
      connector => String(connector.id) === id,
    );
    return connector;
  }
}
export default ConnectorRepositoryInMemory;
