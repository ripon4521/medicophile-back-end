import { FilterQuery, Model, PopulateOptions, Query } from "mongoose";

class QueryBuilder<T> {
  private model: Model<T>;
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(model: Model<T>, query: Record<string, unknown>) {
    this.model = model;
    this.query = query;
    this.modelQuery = this.model.find({ isDeleted: false }); // Default query
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.search as string;

    if (searchTerm) {
      const searchQuery = {
        $or: searchableFields
          .filter((field) => {
            const schemaType = (this.model.schema as any).paths[field];
            return schemaType?.instance === "String";
          })
          .map((field) => ({
            [field]: { $regex: new RegExp(searchTerm, "i") },
          })),
      };

      this.modelQuery = this.modelQuery.find(searchQuery as FilterQuery<T>);
    }

    return this;
  }
  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ["search", "sort", "limit", "page", "fields"];
    excludeFields.forEach((field) => delete queryObj[field]);

    // Special case for array filters like tags
    for (const key in queryObj) {
      const value = queryObj[key];

      // Check if the value is a comma-separated string (e.g., "mern,web")
      if (typeof value === "string" && value.includes(",")) {
        queryObj[key] = { $in: value.split(",") };
      }

      // Optional: if you also want to handle arrays directly passed from Postman like tags[]=mern&tags[]=web
      if (Array.isArray(value)) {
        queryObj[key] = { $in: value };
      }
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy =
      (this.query.sort as string)?.split(",").join(" ") || "-createdAt";
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
    const fields =
      (this.query.fields as string)?.split(",").join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
  populate(path: PopulateOptions | (string | PopulateOptions)[]) {
    this.modelQuery = this.modelQuery.populate(path);
    return this;
  }

  exec() {
    return this.modelQuery;
  }
}

export default QueryBuilder;
