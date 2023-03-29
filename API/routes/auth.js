const {Router} = require('express')
const bcrypt = require('bcrypt')
const {body, validationResult} = require('express-validator')

const UserSchema = require('../models/user')

const router = Router()

const registerValidator = [
    body('username').isLength({min: 5}),
    body('password').isLength({min: 6}),
    body('repeat').custom((value, {req}) => {
        if (value !== req.body.password) {return Promise.reject('Password confirmation does not match password.')}
        return true;
    }),
    body('username').custom(value => {
        return UserSchema.find({username: value}).then(user => {
            if(user.length > 0) {
                console.log(user)
                return Promise.reject("Username already in use.")
            }
        })
    })
]

router.post('/register', registerValidator, async(req, res) => {
    const {name, username, password, repeat} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    const hashPassword = await bcrypt.hash(password, 12)
    const user = new UserSchema({
        name, username, password: hashPassword
    })
    await user.save().then((result) => {
        console.log(result)
        res.status(200, {'Content-Type': 'application/json'})
        .end(JSON.stringify(result))
    })
})

const loginValidator = [
   
]

router.post('/login', async(req, res) => {
    const {username, password} = req.body
    const user = await UserSchema.findOne({username})

    if(!user) {
        return res.status(400)
        .json({errors: [{value:username,msg:"User not found.",param:"username",location:"body"}]})
    }

    const passwordMatch = bcrypt.compare(password, user.password)
    if(passwordMatch) {
        console.log(req.session)
        req.session.user = user;
        req.session.save(err => {
            if (err) {throw err}
        })
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
        .end(JSON.stringify(user))
})



module.exports = router;