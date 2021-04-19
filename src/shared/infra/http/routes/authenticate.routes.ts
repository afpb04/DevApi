import { Router } from 'express';

import AuthenticateUseController from '../../../../modules/users/UseCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUseController();

authenticateRoutes.post('/', authenticateUserController.handle);

export default authenticateRoutes;
