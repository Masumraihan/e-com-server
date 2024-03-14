import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
  },
});

const ReviewModel = model<TReview>('Review', reviewSchema);
export default ReviewModel;
