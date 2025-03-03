import express from 'express';
import { studentsController } from './student.controller';


const studentRoute = express.Router();
studentRoute.get('/', studentsController.getAllStudents );
studentRoute.get('/:id', studentsController.getSingleStudent);
studentRoute.patch('/:id', studentsController.updatedStudent);
studentRoute.delete("/:id", studentsController.deleteStudent);

export default studentRoute;