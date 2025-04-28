import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { noticeValidation } from "./notice.validation";
import { noticeController } from "./notice.controller";


const noticeRoute = Router();
noticeRoute.post("/create-notice", validateRequest(noticeValidation.createNoticeSchema), noticeController.createNotice);
noticeRoute.get('/', noticeController.getAllNotice);
noticeRoute.get("/:slug", noticeController.getSingleNotice);
noticeRoute.patch('/:slug', validateRequest(noticeValidation.updateNoticeSchema), noticeController.updateNotice);
noticeRoute.delete("/:slug", noticeController.deleteNotice);
export default noticeRoute;