import { FilterQuery, Query } from 'mongoose';
import { productSearchableFields } from '../modules/product/product.constant';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search() {
    let searchTerm = '';
    if (this.query?.searchTerm) {
      searchTerm = this.query.searchTerm as string;
    }
    this.modelQuery = this.modelQuery.find({
      $or: productSearchableFields.map(
        (field) =>
          ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          }) as FilterQuery<T>,
      ),
    });
    return this;
  }

  filter() {
    const excludeFields = ['searchTerm', 'page', 'limit', 'sortBy', 'fields'];
    const queryObj = { ...this.query } as FilterQuery<T>;
    excludeFields.forEach((field) => delete queryObj[field]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    const sortBy = (this.query?.sortBy as string) || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = (this.query?.fields as string)?.replace(',', ' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async meta() {
    const totalQuery = this.modelQuery.getFilter();
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const total = await this.modelQuery.model.countDocuments(totalQuery);
    return { page, limit, total };
  }
}

export default QueryBuilder;
