const {Schema, model, ObjectId} = require('mongoose')

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
    },
    user: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: ObjectId,
            required: true
        }
    }
})

module.exports = model('Note', NoteSchema)