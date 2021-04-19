import { container } from 'tsyringe';

import ConnectorRepository from '../../modules/connector/infra/typeorm/repositories/ConnectorRepository';
import IConnectorRepository from '../../modules/connector/repositories/IConnectorRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IConnectorRepository>(
  'ConnectorRepository',
  ConnectorRepository,
);
