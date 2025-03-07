import express from 'express';
import { researchController } from './research.controller';


const researchRoute = express.Router();
researchRoute.post('/', researchController.createResearch );
researchRoute.get('/', researchController.getResearch );
researchRoute.get('/:id', researchController.getSingleResearch);
researchRoute.patch('/:id', researchController.updateResearch);
researchRoute.delete("/:id", researchController.deleteResearch);

export default researchRoute;
