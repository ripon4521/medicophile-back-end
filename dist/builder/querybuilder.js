"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(model, query) {
        this.model = model;
        this.query = query;
        this.modelQuery = this.model.find({ isDeleted: false }); // Default query
    }
    search(searchableFields) {
        const searchTerm = this.query.search;
        if (searchTerm) {
            const searchQuery = {
                $or: searchableFields
                    .filter((field) => {
                    const schemaType = this.model.schema.paths[field];
                    return (schemaType === null || schemaType === void 0 ? void 0 : schemaType.instance) === 'String';
                })
                    .map((field) => ({
                    [field]: { $regex: new RegExp(searchTerm, 'i') },
                })),
            };
            this.modelQuery = this.modelQuery.find(searchQuery);
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ['search', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((field) => delete queryObj[field]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a;
        const sortBy = ((_a = this.query.sort) === null || _a === void 0 ? void 0 : _a.split(',').join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sortBy);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a;
        const fields = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',').join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    populate(path) {
        this.modelQuery = this.modelQuery.populate(path);
        return this;
    }
    exec() {
        return this.modelQuery;
    }
}
exports.default = QueryBuilder;
