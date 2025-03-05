import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { eventValidations } from './event.validation';
import { eventController } from './event.controller';
import e from 'express';


const eventRouter = express.Router();

eventRouter.post('/create-event', validateRequest(eventValidations.createEventSchema), eventController.createEvent);
eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:id', eventController.getSingleEvent);
eventRouter.patch('/:id', validateRequest(eventValidations.updateEventSchema), eventController.updateEvent);
eventRouter.delete('/:id', eventController.deleteEvent);

export default eventRouter;