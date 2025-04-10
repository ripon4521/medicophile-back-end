"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const docs_validation_1 = require("./docs.validation");
const docs_controller_1 = require("./docs.controller");
const docsRouter = (0, express_1.Router)();
docsRouter.post('/create-docs', (0, validateRequest_1.default)(docs_validation_1.docsValidation.createDocsSchema), docs_controller_1.docsController.createDocs);
docsRouter.get('/', docs_controller_1.docsController.getAllDocs);
docsRouter.get('/:slug', docs_controller_1.docsController.singleDocs);
docsRouter.patch('/update-docs', (0, validateRequest_1.default)(docs_validation_1.docsValidation.updateDocsSchema), docs_controller_1.docsController.updateDocs);
docsRouter.delete('/delete-docs', docs_controller_1.docsController.deleteDocs);
exports.default = docsRouter;
