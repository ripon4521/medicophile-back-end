import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { preorderController } from './preorder.controller';

const preOrderRouter = express.Router();
preOrderRouter.post('/craete-preOrder', preorderController.createPreOrder);
preOrderRouter.get('/', preorderController.getAllPreOrders);
preOrderRouter.get('/:id', preorderController.getSinglePreOrder);
preOrderRouter.patch('/:id', preorderController.updatePreOrder);
preOrderRouter.delete('/:id', preorderController.deletePreOrder);

export default preOrderRouter;