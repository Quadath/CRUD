const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)


const cors = require('cors')


const NoteRouter = require('./routes/note')
const AuthRouter = require('./routes/auth')

const keys = require('./keys')
const app = express()

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGO_URL
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
app.use('/auth', AuthRouter)

app.get('/', (req, res) => {
    console.log(req.user)
})

mongoose.set('strictQuery', false)
mongoose.connect(keys.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))

app.listen(3000, () => console.log('App is running on port 3000'))
