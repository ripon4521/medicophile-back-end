import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { coursReviewValidation } from "./courseReview.validation";
import { courseReveiwController } from "./courseReview.controller";


const courseReveiewRouter = Router();
courseReveiewRouter.post('/create-course-review', validateRequest(coursReviewValidation.createCourseReviewZodSchema), courseReveiwController.createCourseReveiw);
courseReveiewRouter.patch('/:id', validateRequest(coursReviewValidation.updateCourseReviewZodSchema), courseReveiwController.updateCourseReview);
courseReveiewRouter.get('/', courseReveiwController.getAllCourseReview);
courseReveiewRouter.get('/:courseId', courseReveiwController.getSingleCourseReview);
courseReveiewRouter.delete('/:id', courseReveiwController.deleteCourseReveiw);
export default courseReveiewRouter;