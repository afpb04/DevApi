import ConnectorRepositoryInMemory from '../../repositories/in-memory/ConnectorRepositoryInMemory';
import CreateConnectorUseCase from './CreateConnectorUseCase';

let connectorRepositoryInMemory: ConnectorRepositoryInMemory;
let createConnectorUseCase: CreateConnectorUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    connectorRepositoryInMemory = new ConnectorRepositoryInMemory();
    createConnectorUseCase = new CreateConnectorUseCase(
      connectorRepositoryInMemory,
    );
  });
  it('should be able to create a new connector', async () => {
    const connection = await createConnectorUseCase.execute({
      user_id: 'user_id',
      name: 'Name example 1',
      category: 'category example',
      privacy: 'PUBlIC',
      base_url: 'http://example.com',
      logo_url: 'http://logourl.com',
      description: 'description example',
      status: 'status',
      type: 'REST',
    });
    expect(connection).toHaveProperty('id');
  });
});
