import {Schema, model} from 'mongoose';
// @ts-ignore
import moment from 'moment';


export interface Mark {
  _id: string,
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
  createDate: {type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss')},
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
  icon: {type: Schema.Types.ObjectId, required: true},
});

export const MarkModel = model<Mark>('Marks', schema);
