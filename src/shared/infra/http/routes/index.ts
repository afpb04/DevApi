import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import connectorRoutes from './connector.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);
router.use('/connector', connectorRoutes);

export default router;
