const { setDefaultResultOrder } = require('dns/promises');
const {Router} = require('express')
const NoteSchema = require('../models/note')
const UserSchema = require('../models/user')
const router = Router()

router.get('/', async (req, res) => {
    console.log(req.session.user)
    let page = req.query.page - 1;
    if (isNaN(page)) page = 0;
    if(page < 0) page = 0
    const count = await NoteSchema.count();
    if (page > count / 3) page = Math.floor(count / 3)

    if (req.session.user) {
        UserSchema.findOne({ _id: req.session.user})
            .then((user, error) => {
                const name = user.name
                NoteSchema.find({})
                    .skip(page * 10)
                    .limit(10)
                    .then((posts, error) => {
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({
                            name,
                            posts
                        }))
                    })
                
            })
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'})
            .end(JSON.stringify({'message': 'You are not signed in'}))
    }
    
})
router.post('/', async (req, res) => {
    const user = req.session.user;
    console.log(user)
    if (!user) {
        return res.writeHead(400).end("You are not authenticated.")
    }
    const u = await UserSchema.findById(user)
    const name = u.name;

    const {text} = req.body;
    if (text == '') {
        res.writeHead(400).end("Field text should not be empty")
        return;
    }
    console.log(req.body)
    const note = new NoteSchema({
        text,
        user: {
            name,
            _id: user
        }
    })
    await note.save().then((result) => {
        res.status(200, {'Content-Type': 'application/json'})
        .end(JSON.stringify(result))
    })
    // NoteSchema.updateOne(
    //     {text: text},
    //     {text: text},   
    //     {upsert: true}
    // ).then((result, error) => {
    //     res.writeHead(200, {'Content-Type': 'application/json'})
    //     .end(JSON.stringify(result))
    // })
})

module.exports = router;