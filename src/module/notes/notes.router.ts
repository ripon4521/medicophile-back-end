import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { noteValidation } from "./notes.validation";
import { notesController } from "./notes.controller";

const noteRouter = Router();
noteRouter.post(
  "/create-note",
  validateRequest(noteValidation.createNotesSchema),
  notesController.createNote,
);
noteRouter.get("/", notesController.getAllNotes);
noteRouter.get("/:id", notesController.getSpeecificNotes);
noteRouter.get("/:slug", notesController.getSingleNote);
noteRouter.patch(
  "/:slug",
  validateRequest(noteValidation.updateNotesSchema),
  notesController.updateNote,
);
noteRouter.delete("/:slug", notesController.deleteNote);

export default noteRouter;
