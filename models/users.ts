import {Schema, model} from 'mongoose';


export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  imageSrc?: string
};

const schema = new Schema<User>({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  imageSrc: {type: String, default: null},
});

export const UserModel = model<User>('Users', schema);
