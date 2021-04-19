import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateConnectorUseCase from './UpdateConnectorUseCase';

class UpdateConnectorController {
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

    const { id } = request.params;

    const user_id = request.user.id;

    const createConnectorUseCase = container.resolve(UpdateConnectorUseCase);
    const connector = await createConnectorUseCase.execute({
      id,
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
    return response.json(connector);
  }
}

export default UpdateConnectorController;
