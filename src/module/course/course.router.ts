import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';


const courseRouter = express.Router();
courseRouter.post('/create-course', validateRequest(courseValidation.createCourseSchema), courseController.createCourse);
courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/:slug', courseController.getSingleCourse);
courseRouter.patch('/:slug', validateRequest(courseValidation.updateCourseSchema), courseController.updateCourse);
courseRouter.delete('/:slug', courseController.deleteCourse);
export default courseRouter;