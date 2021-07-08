import {Schema, model} from 'mongoose';


export interface Mark {
  title: string,
  content: string,
  createDate: string,
  updateTime: string,
  location: {
    type: string,
    coordinates: [number, number]
  },
  user: string,
  icon: string
}

const schema = new Schema<Mark>({
  title: {type: String, required: true},
  content: {type: String, default: null},
  createDate: {type: Date, required: true, default: Date.now},
  updateDate: {type: Date, required: true, default: null},
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  user: {type: Schema.Types.ObjectId, required: true},
  icon: {type: Schema.Types.ObjectId, required: true},
});

export const MarkModel = model<Mark>('Marks', schema);
