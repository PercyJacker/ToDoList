import multer from "multer"


const storage = multer.diskStorage({
    //cb means callback
    destination: function (req, file, cb) {
      cb(null, "/new/public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ storage: storage })