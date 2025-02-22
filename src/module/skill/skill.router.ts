import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { skillValidation } from "./skill.validation";
import { skillController } from "./skill.controller";


const skillRouter = Router();

skillRouter.post('/create-skill', validateRequest(skillValidation.createSkill), skillController.createSkill);
skillRouter.get('/', skillController.getSkills);
skillRouter.get('/:id', skillController.getSingleSkillById);
skillRouter.patch('/:id', validateRequest(skillValidation.updateSkill), skillController.updateSkillById);
skillRouter.delete('/:id', skillController.deleteSkillById);

export default skillRouter;