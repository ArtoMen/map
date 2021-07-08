// @ts-ignore
import mongoose from 'mongoose';
import {settings} from '../settings/settings';

// function
async function start() {
  try {
    await mongoose.connect(settings.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DataBase connect!');
  } catch (e) {
    console.log(e);
  }
}

export {start};
