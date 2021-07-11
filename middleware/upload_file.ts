// @ts-ignore
import multer from 'multer';
// @ts-ignore
import moment from 'moment';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },

  filename: function(req: any, file: any, cb: any) {
    const date = moment().format('YYYY-MM-DD_HH-mm-ss');
    cb(null, `${date}${file.originalname}`);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.indexOf('file') === -1 ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 500,
};

export default multer({storage, fileFilter, limits});


