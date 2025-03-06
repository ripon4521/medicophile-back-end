import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { canteenstaffsController } from './canteenstaff.controller';
import { canteenstaffValidation } from './canteenstaff.validation';


const canteenstaffRoute = express.Router();
canteenstaffRoute.get('/', canteenstaffsController.getAllCanteenstaff);
canteenstaffRoute.get('/:id', canteenstaffsController.getSingleCanteenstaff);
canteenstaffRoute.patch('/:id', validateRequest(canteenstaffValidation.updatecanteenstaffValidationSchema) ,canteenstaffsController.updatedCanteenstaff);
canteenstaffRoute.delete("/:id", canteenstaffsController.deleteCanteenstaff);

export default canteenstaffRoute;
