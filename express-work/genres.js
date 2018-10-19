const express = require("express")
const app = express()

//genres
const genres = [
    {"id": 1, "name": "Comedy"},
    {"id": 2, "name": "Rom-com"},
    {"id": 1, "name": "sit-com"},
    {"id": 1, "name": "spoof"}
]
app.get('/',(req,res) => {
    res.send(JSON.stringify(genres))
})

app.post('/api/genres', (req,res) => {
    genres.push(
        {
            id : genres.length + 1,
            name: req.body.name
        }
    )
    res.send(JSON.stringify(genres))
})
const port = process.env.port || '3000'
app.listen(port, () => console.log(`Listening to port ${port}`))