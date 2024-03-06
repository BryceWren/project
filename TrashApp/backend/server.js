const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "UserThree", "UserFour"] })
})

app.listen(5000, () => {console.log("Server started on port 5000")})
