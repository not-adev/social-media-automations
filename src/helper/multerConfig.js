import multer from "multer";
import fs from 'fs'
import path from "path";

const destination = './public/upload'
const storage = multer.diskStorage({
    destination: destination,
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }

})

function filter(req, file, cb) {
    const allowed = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi']
    if (!allowed.includes(file.mintype)) {
        const error = new Error('invalid file type')
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null,true)

}

export const upload = multer({
    storage,
    fileFilter : filter 
})