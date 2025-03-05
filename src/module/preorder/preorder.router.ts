import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { preOrderValidations } from './preorder.validation';
import { preorderController } from './preorder.controller';

const preOrderRouter = express.Router();
preOrderRouter.post('/craete-preOrder', validateRequest(preOrderValidations.createpreOrderSchema), preorderController.createPreOrder);
preOrderRouter.get('/', preorderController.getAllPreOrders);
preOrderRouter.get('/:id', preorderController.getSinglePreOrder);
preOrderRouter.patch('/:id', validateRequest(preOrderValidations.updatepreOrderSchema), preorderController.updatePreOrder);
preOrderRouter.delete('/:id', preorderController.deletePreOrder);

export default preOrderRouter;