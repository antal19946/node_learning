const multer = require("multer")
// require('../../uploads/')

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + file.originalname)
            console.log(file)
        }
    })
}).single('file')

module.exports = {upload}