const { setDefaultResultOrder } = require('dns/promises');
const {Router} = require('express')
const NoteSchema = require('../models/note')
const router = Router()

router.get('/', async (req, res) => {
    let page = req.query.page - 1;
    if (isNaN(page)) page = 0;
    if(page < 0) page = 0
    const count = await NoteSchema.count();
    if (page > count / 3) page = Math.floor(count / 3)
    
    NoteSchema.find({})
        .skip(page * 10)
        .limit(10)
        .then((result, error) => {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(result))
        })
})
router.post('/', (req, res) => {
    const {text} = req.body;
    if (text == '') {
        res.writeHead(400).end("Field text should not be empty")
        return;
    }
    console.log(req.body)
    NoteSchema.updateOne(
        {text: text},
        {text: text},   
        {upsert: true}
    ).then((result, error) => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        .end(JSON.stringify(result))
    })
})

module.exports = router;