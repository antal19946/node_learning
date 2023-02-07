const mongoose = require('mongoose')
// const validator = require('validator')


const userNameSchema = new mongoose.Schema({
    structure: {
        type: String,
        required: true

    },
    startwith:{
        type: String,
        required: true
    }
   
})
const userNameType = new mongoose.model('userNameType', userNameSchema)
module.exports = userNameType