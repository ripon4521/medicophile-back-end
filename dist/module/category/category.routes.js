"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
// Create a new Category ----------done
router.post('/', category_controller_1.CategoryControllers.createCategory);
// Get all Category -------- done
router.get('/', category_controller_1.CategoryControllers.getAllCategory);
// Update a Category by ID ----------- done
router.put('/:categoryId', category_controller_1.CategoryControllers.updateCategory);
// Delete a Category by ID ---------- done
router.delete('/:categoryId', category_controller_1.CategoryControllers.deleteCategory);
exports.CategoryRoutes = router;
