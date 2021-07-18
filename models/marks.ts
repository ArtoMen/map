// @ts-ignore
import {Schema, model} from 'mongoose';

export interface Mark {
  id: string,
  title: string,
  content: string,
  createDate: string,
  updateTime: string,
  location: {
    type: string,
    coordinates: [number, number]
  },
  user: string,
  icon: string,
  files: Array<{
    fileSrc: string,
    uploadDate: string,
  }>,
  comments: Array<{
    content: string,
    createDate: string,
    updateDate: string,
    user: string,
  }>,
  ratings: Array<{
    value: number,
    user: string,
  }>,
}

const schema = new Schema<Mark>({
  title: {type: String, required: true},
  content: {type: String, default: null},
  createDate: {type: Date, default: Date.now},
  updateDate: {type: Date, default: null},
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  user: {type: Schema.Types.ObjectId, required: true},
  icon: {type: String, default: null},
  files: [{
    fileSrc: String,
    uploadDate: Date,
  }],
  comments: [{
   content: String,
    createDate: {type: Date, default: Date.now},
    updateDate: {type: Date, default: null},
    user: Schema.Types.ObjectId,
  }],
  ratings: [{
    value: Number,
    user: Schema.Types.ObjectId,
  }]
});

export const MarkModel = model<Mark>('Marks', schema);
