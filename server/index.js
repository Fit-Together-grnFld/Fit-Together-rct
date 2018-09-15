const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../database');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

//ADD USER
app.post('/signup', (req, res) => {
  console.log(req.query)
  let name = req.query.name;
  let password = req.query.password;
  let img = req.query.image;
  let phone = req.query.phone;
  let email = req.query.email;
  let zip = req.query.zip;
  
  db.getUserByName(name, (user) => {
    if (user) {
      res.send('There is already a user with that name');
    } else {
      // bcrypt.hash(password, 10, function (err, hash) {
      //   // Store hash in your password DB.
      //   if (err) {
      //     console.log(err);
      //   } else {
          db.addUser(name, password, img, phone, email, zip)
          res.send('User added to database');
      //   }
      // });
      
    }
  })
})


//ADD GAME
app.post('/createGame', (req, res) => {
  let gameName = req.query.gameName;
  let type = req.query.type;
  let description = req.query.description;
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let zip = req.query.zip;
  let creator = req.query.creator;
  let date = req.query.date;
  let time = req.query.time;
  db.getGameByName(gameName, (game) => {
    if (game) {
      res.send('There is already an event with that name')
    } else {
      db.addGame(gameName, type, description, street, city, state, zip, creator, date, time);
      res.send('Game saved to database')
    }
  })
})

//ADD PLAYER TO GAME
app.post('/joinGame', (req, res) => {
  let name = req.query.name;
  let game = req.query.gameName;
  db.getPlayerFromGame(name, game, (player) => {
    if (player) {
      res.send('You are already signed up for this event')
    } else {
      db.addPlayerToGame(name, gameName);
      res.send('You have expressed interest')
    }
  })
})

//LOGIN
app.get('/login', (req, res) => {
  let inputPassword;
  let name = req.query.name;
  let password = req.query.password;
  console.log(name);
  console.log(password);
  // bcrypt.hash(password, 10, function (err, hash) {
  //   // Store hash in your password DB.
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     inputPassword = hash;
  //   }
  // })
  //   .then(db.getPasswordFromUser(name, (pass) => {
  //     bcrypt.compare(pass, hash, function (err, res) {
  //       if (err) {
  //         console.log(err)
  //       } else {
  //         res.send(true);
  //       }
  //     });
  //   }))
  db.getPasswordFromUser(name, (pass) => {
    console.log(pass);
    console.log(password)
       if(pass === password){
        console.log(true);
        res.send(true);
      } else {
        res.send(false);
      }
  })
})

//SEND A MESSAGE
app.post('/message', (req, res) => {
  let name = req.query.name;
  let game = req.query.gameName;
  let message = req.query.message;
  db.addMessage(name, game, message)
})

//GET ALL INFO FOR ONE USER
app.get('/user', (req, res) => {
  let name = req.query.name;
  db.getUserByName(name, (user) => {
      console.log('User Found')
      res.send(user);
  })
})

//GET ALL INFO ON A GAME
app.get('/game', (req, res) => {
  let name = req.query.gameName;
  db.getGameByName(name, (err, game) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Game Found');
      res.send(game);
    }
  })
})

//TEST incoming data
app.get('/test', (req, res) => {
  res.send('success!');
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

