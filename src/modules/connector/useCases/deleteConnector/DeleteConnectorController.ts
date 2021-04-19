import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteConnectorUseCase from './DeleteConnectorUseCase';

class DeleteConnectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteConnectorController = container.resolve(DeleteConnectorUseCase);

    await deleteConnectorController.execute({ id });

    return response.status(200).send();
  }
}

export default DeleteConnectorController;
