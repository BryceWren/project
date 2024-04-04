const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./postgres')
var cors = require('cors')

app.use(cors())
var jsonParser = bodyParser.json()
app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "UserThree", "UserFour"] })
})

app.listen(5000, () => {console.log("Server started on port 5000")})

app.get('/IndividualCleanup', jsonParser, db.getSpecificEvent)
app.get('/events', jsonParser,db.getEventPost)
app.post('/cleanupregisterhost', jsonParser, db.setEventPost)
app.get('/home', jsonParser, db.getMapTable)
app.post('/home',jsonParser, db.setMapTable)
app.post('/register', jsonParser, db.registerUser)
app.post('/',jsonParser, db.loginUser)
