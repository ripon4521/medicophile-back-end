"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueSlug = generateUniqueSlug;
// Utility function for detecting if the title is in Bangla
function isBangla(title) {
    return /[\u0980-\u09FF]/.test(title); // Check if the title contains Bangla characters
}
// Utility function for generating slug from Bangla title
function generateBanglaSlug(title) {
    // Remove special characters and replace spaces with hyphens
    const baseSlug = title
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-zA-Z0-9-\u0980-\u09FF]/g, "") // Remove non-Bangla characters
        .toLowerCase() // Convert to lowercase
        .trim();
    return baseSlug;
}
// Function to generate a unique slug with a random suffix
function generateUniqueSlug(title) {
    let baseSlug = "";
    // Check if the title is in Bangla
    if (isBangla(title)) {
        baseSlug = generateBanglaSlug(title); // Use Bangla slug generation
    }
    else {
        baseSlug = title
            .toLowerCase() // Convert to lowercase
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[^a-z0-9\-]/g, "") // Remove non-alphanumeric characters
            .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
            .trim();
    }
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Random number for uniqueness
    return `${baseSlug}-${randomSuffix}`; // Combine base slug and random suffix
}
