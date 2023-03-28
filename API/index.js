const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)


const cors = require('cors')


const NoteRouter = require('./routes/note')

const keys = require('./keys')

const app = express()

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGO_URI
})

app.use(express.json())
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(cors())
app.use('/notes', NoteRouter)

mongoose.set('strictQuery', false)
mongoose.connect("")
    .then(() => console.log('Connected to MongoDB'))

app.listen(3000, () => console.log('App is running on port 3000'))