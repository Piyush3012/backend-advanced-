import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) this is used to add some suffix to the filename such as piyush_suffix
      cb(null, file.originalname)//learn about the file which contains many function
    }
  })
  
  export const upload = multer({ 
    storage,
})