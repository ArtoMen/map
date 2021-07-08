import {Schema, model} from 'mongoose';

export interface Comment {
  content: string,
  createDate: string,
  updateDate: string,
  mark: string,
  user: string
}

const schema = new Schema<Comment>({
  content: {type: String, required: true},
  createDate: {type: Date, default: Date.now},
  updateTime: {type: Date, default: null},
  mark: {type: Schema.Types.ObjectId, required: true},
  user: {type: Schema.Types.ObjectId, required: true},
});

export const filesModel = model<Comment>('Comments', schema);
