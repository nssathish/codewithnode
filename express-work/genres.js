const express = require("express")
const app = express()

const joi = require("joi") //for validation rules
app.use(express.json()) //to let node know about the request body

//genres
var genres = [
    {"id": 1, "name": "Comedy"},
    {"id": 2, "name": "Rom-com"},
    {"id": 3, "name": "sit-com"},
    {"id": 4, "name": "spoof"}
]
app.get('/',(req,res) => {
    res.send(JSON.stringify(genres))
})

app.post('/api/genres', (req,res) => {
    console.log(req.body)
    genres.push(
        {
            id : genres.length + 1,
            name: req.body.name
        }
    )
    res.send(JSON.stringify(genres))
})

const validateGenres = (genre) => {
    const schema = {
        name: joi.string().min(3).required()
    }
    return joi.validate(genre,schema)
}
const port = process.env.PORT || '3000'
app.listen(port, () => console.log(`Listening to port ${port}`))