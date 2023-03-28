const {Schema, model} = require('mongoose')

const NoteSchema = new Schema({
    text: {
        type: String,
        required: true
    }, 
    time: {
        type: Date,
        default: new Date()
    },
    important: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Note', NoteSchema)