import { hash } from 'bcryptjs';
import { getMongoRepository } from 'typeorm';

import Connector from '../../../../modules/connector/infra/typeorm/schemas/Connector';
import User from '../../../../modules/users/infra/typeorm/schemas/User';
import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  const password = await hash('admin', 8);

  const repository = getMongoRepository(User);

  const user = repository.create({
    name: 'admin',
    email: 'admin@devapi.com.br',
    password,
  });
  await repository.save(user);

  const connectorRepository = getMongoRepository(Connector);

  const connector = connectorRepository.create({
    user_id: String(user.id),
    name: 'Name example 1',
    category: 'category example',
    privacy: 'PUBlIC',
    base_url: 'http://example.com',
    logo_url: 'http://logourl.com',
    description: 'description example',
    status: 'status',
    type: 'REST',
  });
  const connector2 = connectorRepository.create({
    user_id: String(user.id),
    name: 'Name example 2',
    category: 'category example',
    privacy: 'Private',
    base_url: 'http://example.com',
    logo_url: 'http://logourl.com',
    description: 'description example',
    status: 'status',
    type: 'DB',
  });
  const connector3 = connectorRepository.create({
    user_id: String(user.id),
    name: 'Name example 3',
    category: 'category example',
    privacy: 'Private',
    base_url: 'http://example.com',
    logo_url: 'http://logourl.com',
    description: 'description example',
    status: 'status',
    type: 'SOAP',
  });
  await connectorRepository.save([connector, connector2, connector3]);

  await connection.close();
}

create().then(() => console.log('User and data Created!'));
