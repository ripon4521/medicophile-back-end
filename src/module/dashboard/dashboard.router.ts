import express from 'express';
import { dashboardController } from './dashboard.conttoller';


const dashboardRouter = express.Router();

dashboardRouter.get('/Overview', dashboardController.dashboardOverview);

export default dashboardRouter;