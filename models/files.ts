import {Schema, model} from 'mongoose';

export interface File {
  id: string,
  fileSrc: string,
  uploadDate: string,
  mark: string
}

const schema = new Schema<File>({
  fileSrc: {type: String, required: true},
  uploadDate: {type: Date, default: Date.now},
  mark: {type: Schema.Types.ObjectId, required: true},
});

export const FilesModel = model<File>('Files', schema);
