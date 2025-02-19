"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    slug: {
        type: String,
        unique: true,
        required: [true, 'slug is required'],
        match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be in lowercase, and only contain letters, numbers, and hyphens'],
    },
});
exports.CategoryModel = (0, mongoose_1.model)('Category', categorySchema);
