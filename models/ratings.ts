import {Schema, model} from 'mongoose';

export interface Rating {
  _id: string,
  value: number,
  mark: string,
  user: string
}

const schema = new Schema<Rating>({
  value: {type: Number, required: true},
  mark: {type: Schema.Types.ObjectId, required: true},
  user: {type: Schema.Types.ObjectId, required: true},
});

export const ratingModel = model<Rating>('Ratings', schema);
