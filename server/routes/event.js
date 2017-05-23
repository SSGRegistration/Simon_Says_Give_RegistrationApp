var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');


// Get route for all events
router.get('/', function(req,res) {
  console.log('ssgEvent/ Route Hit');
  if(req.isAuthenticated()) {
    // SELECT * FROM event;
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database');
        res.sendStatus(500);
      } else {
        var eventQuery = 'SELECT * FROM event;';
        db.query(eventQuery,function(queryError,result) {
          done();
          if (queryError) {
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            res.send(result.rows);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Posts new events
router.post('/add', function(req,res) {
  console.log("inside /event/add route");
  if(req.isAuthenticated()) {
    console.log("object received is: ", req.body);
    var eventCode = req.body.eventCode;
    var eventName = req.body.eventName;
    var eventTeam = req.body.eventTeam;
    var eventDescription = req.body.eventDescription;
    var eventLocation = req.body.eventLocation;
    var eventDate = req.body.eventDate;
    var eventFromTime = req.body.eventFromTime;
    var eventUntilTime = req.body.eventUntilTime;

    // INSERT INTO event (event_name, event_team, event_description, event_location, event_date,
    // event_from_time, event_until_time, event_username) VALUES
    //('Birthday Celebration', 'MN', 'Biggest B-Day Celb', 'MOA', '2017-8-1','13:0','12:30','MOA2017');
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database');
        res.sendStatus(500);
      } else {
        var eventQuery = 'INSERT INTO event (event_code, event_name, event_team, event_description, event_location, event_date, ' +
          'event_from_time, event_until_time) VALUES ' +
          '($1, $2, $3, $4, $5, $6, $7, $8);'
        db.query(eventQuery,
        [eventCode, eventName,eventTeam,eventDescription,eventLocation,eventDate,eventFromTime,eventUntilTime], function(queryError,result) {
          done();
          if (queryError) {
            console.log('Error making query',queryError);
            // res.sendStatus(500);
            res.send("Error inserting information, make sure Event Code doesn't exist");
          } else {
            res.send("Event created successfully")
            // res.sendStatus(201); // succesful insert status
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// Deletes an event from the database
router.delete('/delete/:eventCode', function(req,res) {
  console.log("/delete route hit");
  if(req.isAuthenticated()) {
    var eventCode = req.params.eventCode;
    // DELETE FROM event WHERE "event_code" = 2;
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database');
        res.sendStatus(500);
      } else {
        db.query('DELETE FROM event WHERE event_code = $1;',[eventCode], function(queryError,result) {
          done();
          if (queryError) {
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

// updates an existing event
router.put('/update', function(req,res) {
  if(req.isAuthenticated()) {
    console.log("object received is: ", req.body);
    var eventCode = req.body.eventCode;
    var eventName = req.body.eventName;
    var eventTeam = req.body.eventTeam;
    var eventDescription = req.body.eventDescription;
    var eventLocation = req.body.eventLocation;
    var eventDate = req.body.eventDate;
    var eventFromTime = req.body.eventFromTime;
    var eventUntilTime = req.body.eventUntilTime;
    // UPDATE event SET ... WHERE event_code = $2;
    pool.connect(function(errorConnectingToDatabase,db,done) {
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database');
        res.send(500);
      } else {
        db.query('UPDATE event SET event_name = $1, event_team = $2, event_description = $3, ' +
        'event_location = $4, event_date = $5, event_from_time = $6, event_until_time = $7 ' +
        ' WHERE event_code = $8;',
        [eventName,eventTeam,eventDescription,eventLocation,eventDate,eventFromTime,eventUntilTime,eventCode],
        function(queryError,result) {
          done();
          if (queryError) {
            console.log('Error making query',queryError);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
});


// get route for starting events
router.get('/start/:code', function(req,res) {
  eventCode = req.params.code;
  console.log('IN event/start/', eventCode);
  // SELECT * FROM event WHERE event_code = '';
  pool.connect(function(errorConnectingToDatabase,db,done) {
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database');
      res.sendStatus(500);
    } else {
      var eventQuery = 'SELECT * FROM event WHERE event_code = $1;';
      db.query(eventQuery,[eventCode],function(queryError,result) {
        done();
        if (queryError) {
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          res.send(result.rows[0]);
        }
      });
    }
  });
});

module.exports = router;
