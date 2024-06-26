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
  const dumpster = request.body.backDumpster
  const parking = request.body.backParking

  console.log(request.body.backlong)

  pool.query('INSERT INTO map (longitude, latitude, locationname, locationtype, severity, dumpster, parking) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING locationid', [longitude,latitude,locationName,locationType,severity, dumpster, parking], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send()
  })
}
//EVENTS
const getEventDetails = (request, response) => {
  const eventid = request.body.backEventIdentification
  pool.query("SELECT * FROM events WHERE eventid = $1",[eventid], (error,results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const updateMarkerIndividualEvent = (request, response) => {
  const locationid = request.body.backlocationid
  const locationseveritychange = request.body.changedcolor
  pool.query("UPDATE map SET severity = $1 WHERE locationid = $2",[locationseveritychange, locationid], (error,results) => { //place holder is 15 for when i get the actual eventid from another location
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const updateFromGroupCleanup = (request, response) => {
  const locationID = request.body.backlocid
  const sevchange = request.body.backcolor
  pool.query("UPDATE map SET severity = $1 WHERE locationid = $2",[sevchange, locationID], (error,results) => { //place holder is 15 for when i get the actual eventid from another location
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const updateMapSeverity = (request, response) => {
  const locationID = request.body.backLOCid;
  const sevchange = request.body.backColor;
  pool.query("UPDATE map SET severity = $1 WHERE locationid = $2", [sevchange, locationID], (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows)
    });
};

const getParticipants = (request, response) => {
  const eventid = request.body.backEventID
  pool.query("SELECT * FROM participants WHERE eventid = $1", [eventid], (error,results) => {
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
  const dumpster = request.body.backdumpster
  const parking = request.body.backparking
  const clothes = request.body.backClothing
  const item = request.body.backItems
  const createdEventID = request.body.backIsCreated



  console.log(request.body.backlong)

  pool.query('INSERT INTO events (locationid, longitude, latitude, locationname,locationtype ,eventseverity, eventdiscription, eventdate, eventtime, severity, finishedEvent, dumpster, parking, clothing, items, iscreated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14,$15,$16) RETURNING eventid',
   [locationid, longitude,lattitude,locationname,locationtype ,locationseverity, desciption, date, time,locationseverity, 0, dumpster, parking, clothes, item, createdEventID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send()
  })
}
//ADD THIS FOR HOST TO SHOW UP IN PARTICIPANTS LIST TAKE IT OUT IF NOT WORKING
const getHostName = (request, response) => {
  const eventid = request.body.backEventID
  pool.query("SELECT * FROM events WHERE eventid = $1", [eventid], (error,results) => {
  if (error) {
    throw error;
  }
  response.status(200).json(results.rows)
})
}

//USERS
const joinEvent = (request, response) => {
  const eventid = request.body.backEventID
  const firstname = request.body.backFirstName
  pool.query('SELECT * FROM participants WHERE eventid = $1 AND firstname = $2', [eventid, firstname], (error, results) => 
{
  if (error){
    throw error
  }
  if (results.rows.length > 0){
    //response.status(400).send('User has already joined this event')  //should give some sort of alert to user as well??
    response.json({ message: "You have already joined this event" });
  } else {
    pool.query('INSERT INTO participants (eventid, firstname) VALUES ($1, $2)', [eventid, firstname], (error, results) => {
      if (error) {
        throw error
      }
        //response.status(201).send('User successfully joined event')
        response.json({ message: "You have successfully joined this event"});
      
     });
    }
  });
};


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
  
  const updateUserInfo = (request, response) => {
    const email = request.body.backemail
    const pass = request.body.backpass
    const userid = request.body.backUserID
    pool.query("UPDATE users SET email = $1, password = $2 WHERE userID = $3",[email, pass, userid], (error,results) => { //place holder is 15 for when i get the actual eventid from another location
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows)
    })
  }
  
module.exports = {
  getHostName, //added this to try to get the host to show as the one who created the event
  updateMapSeverity,
  updateUserInfo,
  getParticipants,
  getEventDetails,
  joinEvent,
  updateFromGroupCleanup,
  updateMarkerIndividualEvent,
  getMapTable,
  setMapTable,
  registerUser,
  loginUser,
  setEventPost,
  getEventPost
}