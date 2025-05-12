import express from 'express';
import { initiatePayment } from './bkash.controller';


const bkashRoute = express.Router();

bkashRoute.post('/pay', initiatePayment);

export default bkashRoute;
