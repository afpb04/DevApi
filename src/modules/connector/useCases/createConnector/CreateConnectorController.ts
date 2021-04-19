import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateConnectorUseCase from './CreateConnectorUseCase';

class CreateConnectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      type,
      privacy,
      base_url,
      category,
      description,
      logo_url,
      status,
    } = request.body;

    const { id } = request.user;

    const createConnectorUseCase = container.resolve(CreateConnectorUseCase);
    const connector = await createConnectorUseCase.execute({
      name,
      type,
      privacy,
      base_url,
      category,
      description,
      logo_url,
      status,
      user_id: id,
    });
    return response.json(connector);
  }
}

export default CreateConnectorController;
