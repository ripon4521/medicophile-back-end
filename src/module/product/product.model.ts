import { Schema, model } from 'mongoose';
import { Product, Category } from './product.interface';

const productSchema = new Schema<Product>({

  title: {
    type: String,
    required: [true, 'Product title is required'],
    minlength: [3, 'Title must be at least 3 characters long']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    minlength: [1, 'Author name must be at least 3 characters long']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  inStock: {
    type: Boolean,
    required: [true, 'Stock status is required']
  },


});

export const ProductModel = model<Product>('Product', productSchema);


