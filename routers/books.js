const express = require('express')
const router = express.Router()
const { nanoid } = require('nanoid')

const idLength = 8;

router.get('/', (req, res) => {
    const books = req.app.db.get("books")

    res.send(books)
})

router.get(":id", (req, res) => {
    const book = req.app.db.get("books").find({ id : req.params.id }).value()

    res.send(book)
})

router.post("/", (req, res) => {
    try{
        const book = {
            id : nanoid(idLength),
            ... req.body,
        }

        req.app.db.get("books").push(book).write()
    }catch(err){
        return res.status(500).send(err)
    }
})

router.put("/:id", (req, ers) => {
    try{
        req.app.db.get("books").find({ id : req.paramse.id }).assign(req.body).write()

        res.send(req.app.db.get("books").find({id:req.params.id}))
    }catch{
        return res.status(500).send(error)
    }
})


// router.delete("/:id", (req, res) => {
//     req.app.db.get("books").remove
// })

module.exports = router