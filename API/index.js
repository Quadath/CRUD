const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')


const NoteRouter = require('./routes/note')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/notes', NoteRouter)

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1:27017/crud")
    .then(() => console.log('Connected to MongoDB'))

app.listen(3000, () => console.log('App is running on port 3000'))