const mongoose = require('mongoose')
// const validator = require('validator')


const passwordTypeSchema = new mongoose.Schema({
    structure: {
        type: String,
        required: true

    },
    passwordType:{
        type: String,
        required: true
    }
   
})
const passwordType = new mongoose.model('passwordType', passwordTypeSchema)
module.exports = passwordType