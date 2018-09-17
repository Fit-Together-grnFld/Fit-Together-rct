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
  console.log(req.body.params);
  body = req.body.params
  let name = body.name;
  let password = body.password;
  let image = body.image;
  let phone = body.phone;
  let email = body.email;
  let zip = body.zip;
  db.addUser(name, password, image, phone, email, zip);
  db.getUserByName(name, (user) => {
    if (user) {
      res.send('There is already a user with that name');
    } else {
  //     // bcrypt.hash(password, 10, function (err, hash) {
  //     //   // Store hash in your password DB.
  //     //   if (err) {
  //     //     console.log(err);
      db.addUser(name, password, image, phone, email, zip)
      res.send('User added to database');
  //     //   } else {
        }
  //     // });

    
  })
})


//ADD GAME
app.post('/createGame', (req, res) => {
  console.log(req.body.params);
  body = req.body.params
  let gameName = body.gameName;
  let type = body.type;
  let image = body.image;
  let description = body.description;
  let street = body.street;
  let city = body.city;
  let state = body.state;
  let zip = body.zip;
  let creator = body.creator;
  let date = body.date;
  let time = body.time;
  db.getGameByName(gameName, (game) => {
    if (!game) {
      res.send('There is already an event with that name')
    } else {
      db.addGame(gameName, type, image, description, street, city, state, zip, creator, date, time);
      res.send('Game saved to database')
    }
  })
})

//ADD PLAYER TO GAME
app.post('/joinGame', (req, res) => {
  let name = req.query.name;
  let game = req.query.gameName;
  console.log(req)
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
       if(pass === password){
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
  db.getGameByName(name, (game) => {

      console.log('Game Found');
      res.send(game);
    
  })
})

//Get game by interest
app.get('/interest', (req, res)=>{
  // console.log(req.query);
  
  let type=req.query.type;
  // console.log(type)
  db.getGameByInterest(type, (games)=>{
    // console.log(games);
    res.send(games);
  })
})

//Get all games
app.get('/allgames', (req, res) => {
  db.getGames((games)=>{
    // console.log(games);
    res.send(games)
  })
})

//TEST incoming data
app.post('/test', (req, res) => {
  let url ='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjrztjjyLvdAhVGSK0KHTfJBrkQjRx6BAgBEAU&url=http%3A%2F%2Fpowerlisting.wikia.com%2Fwiki%2FFile%3AOutside.jpg&psig=AOvVaw0xBNTfrhp8xVgHAZm0fpOB&ust=1537051379292459';
  db.addGame('lifting', 'fitness', url, 'fun in the sun', '123 Elm', 'NO', 'LA', 70125, 'Kenneth', 13/03/2019, 1 );
  db.addPlayerToGame('Kenneth', 'lifting');
  res.send('success!');
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

