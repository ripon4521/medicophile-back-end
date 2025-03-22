import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    console.log(searchTerm)
    // console.log(searchTerm)
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }


  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['search', 'sort', 'limit', 'page', 'fields', 'sortBy'];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {

    const sortBy = (this.query?.sortBy as string) || 'price';
    const sortOrder = (this.query?.sort as string) === 'desc' ? -1 : 1; 
    const sortFields = (this.query?.sort as string)?.split(',').join(' ') || sortBy;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
  
    return this;
  }
  

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }


  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }






}

export default QueryBuilder;