import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { noteValidation } from "./notes.validation";
import { notesController } from "./notes.controller";
import { authUser, onlyAdminAndFacultyAndStudent } from "../../middlewares/auth";

const noteRouter = Router();
noteRouter.post(
  "/create-note",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(noteValidation.createNotesSchema),
  notesController.createNote,
);
noteRouter.get("/",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher", "student") ,  notesController.getAllNotes);
noteRouter.get("/:id",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher", "student") ,  notesController.getSpeecificNotes);
noteRouter.get("/single-note/:slug",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher", "student") ,  notesController.getSingleNote);
noteRouter.patch(
  "/:slug",
   authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") , 
  validateRequest(noteValidation.updateNotesSchema),
  notesController.updateNote,
);
noteRouter.delete("/:slug",  authUser(), onlyAdminAndFacultyAndStudent("admin", "superAdmin", "teacher") ,  notesController.deleteNote);

export default noteRouter;
