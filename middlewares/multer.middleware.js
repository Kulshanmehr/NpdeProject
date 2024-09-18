import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const absolutePath = path.resolve('public', 'temp');
console.log(absolutePath,"absolutePath"); // Output will be the absolute path
      cb(null, absolutePath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage })

   