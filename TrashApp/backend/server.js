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


app.post('/EventDetails',jsonParser, db.getEventDetails)
app.put('/IndividualCleanup', jsonParser, db.updateMarkerIndividualEvent)
app.put('/postUI', jsonParser, db.updateFromGroupCleanup)
app.post('/postUI', jsonParser, db.getParticipants)
app.put('/Editinformation', jsonParser, db.updateUserInfo)
app.get('/events', jsonParser,db.getEventPost)
app.post('/cleanupregisterhost', jsonParser, db.setEventPost)
app.post('/events', jsonParser,db.joinEvent)
//app.post('/EventDetails', jsonParser,db.joinLocEvent)
app.get('/home', jsonParser, db.getMapTable)
app.post('/home',jsonParser, db.setMapTable)
app.post('/register', jsonParser, db.registerUser)
app.post('/',jsonParser, db.loginUser)
