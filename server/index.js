const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../database');
const app = express();
const axios = require('axios')


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
  // console.log(req.body.params);
  body = req.body.params
  let name = body.name;
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
  console.log(name)
  db.addGame(name, type, image, description, street, city, state, zip, creator, date, time);
  res.send('Game saved to database')
  //   }
  // })
})

//ADD PLAYER TO GAME
app.post('/joinGame', (req, res) => {
  // console.log(req)
  let name = req.body.params.name;
  let game = req.body.params.game;
  console.log(name)
  console.log(game)
  db.addPlayerToGame(name, game);
  res.send('You have expressed interest')
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

app.get('/geoCode', (req,res) => {
  // console.log(req.query)
  const address = req.query
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDX4gzVV9HId5_JMTDLWr4XxvIZ2F9RKaw`, {
  })
    .then(function (response) {
      let latitude = response.data.results[0].geometry.location.lat
      let longitude = response.data.results[0].geometry.location.lng
      res.send({latitude, longitude});
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });  
})

app.post('/image', (req, res) => {
  console.log(req.body.longitude)

  let longitude = req.body.longitude
  let latitude = req.body.latitude
  axios.get(`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${longitude},${latitude}&key=AIzaSyBo4hFFKUrEByZ5KO2TqiFHyj6uGDrFcxI`)
    .then(function (response) {
      let url = response.config.url
      // console.log(response.config.url, 'picBB');
      // console.log()
      // handle success
      
      res.send(url);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
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

app.get('/games', (req, res) => {
  db.getGames(games => {
    res.send(games)
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
// app.post('/test', (req, res) => {
//   let url ='https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjrztjjyLvdAhVGSK0KHTfJBrkQjRx6BAgBEAU&url=http%3A%2F%2Fpowerlisting.wikia.com%2Fwiki%2FFile%3AOutside.jpg&psig=AOvVaw0xBNTfrhp8xVgHAZm0fpOB&ust=1537051379292459';
//   db.addGame('lifting', 'fitness', url, 'fun in the sun', '123 Elm', 'NO', 'LA', 70125, 'Kenneth', 13/03/2019, 1 );
//   db.addPlayerToGame('Kenneth', 'lifting');
//   res.send('success!');
// })

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

