const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const fs = require('fs')




const cors = require('cors')
const NoteRouter = require('./routes/note')
const AuthRouter = require('./routes/auth')

const keys = require('./keys')
const app = express()

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGO_URL
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

app.use(express.json())
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(cors({credentials: true, origin: 'http://95.31.196.92:4000'}));

app.use('/notes', NoteRouter)
app.use('/auth', AuthRouter)

mongoose.set('strictQuery', false)
mongoose.connect(keys.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))

app.listen(3000, () => console.log('App is running on port 3000'))

