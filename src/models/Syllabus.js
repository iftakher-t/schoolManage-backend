const {Schema, model}= require('mongoose')
const bcrypt = require('bcrypt')

const syllabusSchema = new Schema({
    className:String,

    isDeleted:{ type: Boolean, default:false },

   createdDate: { type: Date, default: Date.now },//yyyy-mm-dd
    
})

module.exports = model('Syllabus',syllabusSchema)
