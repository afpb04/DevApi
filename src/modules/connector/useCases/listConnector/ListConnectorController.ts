import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListConnectorUseCase from './ListConnectorUseCase';

class ListConnectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, category, privacy, type } = request.query;

    const listConnectorUseCase = container.resolve(ListConnectorUseCase);

    const connectors = await listConnectorUseCase.execute({
      user_id: id,
      name: name as string,
      category: category as string,
      privacy: privacy as string,
      type: type as string,
    });

    return response.json(connectors);
  }
}

export default ListConnectorController;
