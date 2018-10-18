const express = require("express")
const app = express()

//courses
const courses = [
    {"id": 1, "name": "Mathematics"},
    {"id": 2, "name": "Physics"},
    {"id": 1, "name": "Chemistry"},
    {"id": 1, "name": "Biology"}
]
app.get('/',(req,res) => {
    // res.send("Hello Sathish")
    
    res.send(JSON.stringify(courses))
})

app.post('/api/courses', (req,res) => {
    courses.push(
        {
            id : courses.length + 1,
            name: req.body.name
        }
    )
    res.send(JSON.stringify(courses))
})
const port = process.env.port || '3000'
app.listen(port, () => console.log(`Listening to port ${port}`))