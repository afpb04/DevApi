import { Router } from 'express';

import CreateConnectorController from '../../../../modules/connector/useCases/createConnector/CreateConnectorController';
import DeleteConnectorController from '../../../../modules/connector/useCases/deleteConnector/DeleteConnectorController';
import ListConnectorController from '../../../../modules/connector/useCases/listConnector/ListConnectorController';
import UpdateConnectorController from '../../../../modules/connector/useCases/updateConnector/UpdateConnectorController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const connectorRoutes = Router();

const createConnectorController = new CreateConnectorController();
const updateConnectorController = new UpdateConnectorController();
const listConnectorController = new ListConnectorController();
const deleteConnectorController = new DeleteConnectorController();

connectorRoutes.post(
  '/',
  ensureAuthenticated,
  createConnectorController.handle,
);
connectorRoutes.put(
  '/update/:id',
  ensureAuthenticated,
  updateConnectorController.handle,
);
connectorRoutes.delete(
  '/:id/delete',
  ensureAuthenticated,
  deleteConnectorController.handle,
);
connectorRoutes.get('/', ensureAuthenticated, listConnectorController.handle);

export default connectorRoutes;
