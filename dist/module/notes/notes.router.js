"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const notes_validation_1 = require("./notes.validation");
const notes_controller_1 = require("./notes.controller");
const noteRouter = (0, express_1.Router)();
noteRouter.post("/create-note", (0, validateRequest_1.default)(notes_validation_1.noteValidation.createNotesSchema), notes_controller_1.notesController.createNote);
noteRouter.get("/", notes_controller_1.notesController.getAllNotes);
noteRouter.get("/:slug", notes_controller_1.notesController.getSingleNote);
noteRouter.patch("/:slug", (0, validateRequest_1.default)(notes_validation_1.noteValidation.updateNotesSchema), notes_controller_1.notesController.updateNote);
noteRouter.delete("/:slug", notes_controller_1.notesController.deleteNote);
exports.default = noteRouter;
