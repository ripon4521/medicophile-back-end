import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { IReferralSchema } from './generateReferLink.validation';
import { referallinkController } from './generateReferLink.controller';


const referalLinkRouter = express.Router();


referalLinkRouter.post('/generate-refer-link', validateRequest(IReferralSchema), referallinkController.createReferalLink);
referalLinkRouter.get('/', referallinkController.getAllRferLink);

export default referalLinkRouter;
