// DB CONNECTION

require('dotenv').config();


const Pool = require('pg').Pool


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});

//MAP 

const getMapTable = (request,response) => {
  pool.query('SELECT * FROM map', (error, results) => {
    if (error){
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const setMapTable = (request, response) => {
  const longitude = request.body.backlong;
  const latitude = request.body.backlat;
  const locationName = request.body.backName
  const locationType = request.body.backType
  const severity = request.body.backSeverity

  console.log(request.body.backlong)

  pool.query('INSERT INTO map (longitude, latitude, locationname, locationtype, severity) VALUES ($1, $2, $3, $4, $5) RETURNING locationid', [longitude,latitude,locationName,locationType,severity], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send()
  })
}
//EVENTS
const getSpecificEvent = (request, response) => {
  pool.query("SELECT * FROM events WHERE eventid = $1",[15], (error,results) => { //place holder is 15 for when i get the actual eventid from another location
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getEventPost = (request, response) => {
  pool.query("SELECT * FROM events", (error,results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const setEventPost = (request, response) => {
  const desciption = request.body.backDesc
  const date = request.body.backDate
  const time = request.body.backTime
  const longitude = request.body.backlong
  const lattitude = request.body.backlat
  const locationname = request.body.backName
  const locationseverity = request.body.backSeverity
  const locationtype = request.body.backLocationType
  const locationid = request.body.backlocateid



  console.log(request.body.backlong)

  pool.query('INSERT INTO events (locationid, longitude, latitude, locationname,locationtype ,eventseverity, eventdiscription, eventdate, eventtime, severity, finishedEvent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING eventid',
   [locationid, longitude,lattitude,locationname,locationtype ,locationseverity, desciption, date, time,locationseverity, 0], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send()
  })
}
//USERS

const registerUser = (request, response) => {
    const first = request.body.backFname;
    const last = request.body.backLname;
    const email = request.body.backEmail;
    const pass = request.body.backPassword;
    

pool.query("SELECT * FROM users WHERE email = $1", [email], (error, results) => {
    if (error) {
        throw error;
    }

    if (results.rows.length > 0) {
        console.log('email already registered.')
        
        
    }else {
        pool.query('INSERT INTO users ("email", "password", "firstName", "lastName", "ishost") VALUES ($1, $2, $3, $4, $5)', [email, pass, first, last, 0],(error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send('User registered successfully.');
        })
    };
});

}

const loginUser = (request, response) => {
    const email = request.body.backEmail;
    const pass = request.body.backPassword;

    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, pass], async (error, results) => {
      if (error) {
        throw error
      }
      //response.status(200).json(results.rows)
      if (results.rows.length > 0){
        response.status(200).json(results.rows)
        //if (bcrypt.compare(pass, result[0].pass) = true){ would like to use this to compare passwords
        console.log("login was successful");
        //}
      } else {
        console.log("you suck buddy, you messed something up"); //this means email or password was either wrong or doesnt exist
        response.status(200).json(results.rows)
        
      }
    });

    
  }
module.exports = {
    getSpecificEvent,
    getMapTable,
    setMapTable,
    registerUser,
    loginUser,
    setEventPost,
    getEventPost
}