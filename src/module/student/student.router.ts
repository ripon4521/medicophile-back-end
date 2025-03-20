import express from 'express';
import { studentsController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';



const studentRoute = express.Router();
studentRoute.get('/', studentsController.getAllStudents );
studentRoute.get('/:id', studentsController.getSingleStudent);
studentRoute.delete("/:id", studentsController.deleteStudent);

export default studentRoute;