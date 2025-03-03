import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { busValidations } from './bus.validation';
import { busController } from './bus.controller';


const  busRouter = express.Router();
busRouter.post('/create-bus', validateRequest(busValidations.createBusValidationSchema), busController.createBus);
busRouter.get('/', busController.getBus);
busRouter.get('/:id', busController.getBusById);
busRouter.patch('/:id', validateRequest(busValidations.updateBusValidationSchema), busController.updateBus);
busRouter.delete('/:id', busController.deleteBus);

export default busRouter;