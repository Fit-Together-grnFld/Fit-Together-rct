var mongoose = require('mongoose');
mongoose.connect('mongodb://user:access1@ds151612.mlab.com:51612/fit-together');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  image: String,
  phone: Number,
  email: String,
  zip: Number,
  interests: Array,
  events: Array,
});
const gameSchema = mongoose.Schema({
  name: String,
  image: String,
  type: String,
  description: String,
  street: String,
  city: String,
  state: String,
  zip: Number,
  creator: String,
  players: Array,
  date: Date,
  time: String,
});
const interestSchema = mongoose.Schema({
  interest: String,
});
const messageSchema = mongoose.Schema({
  user: String,
  game: String,
  body: String,
});

const Interest = mongoose.model('Interest', interestSchema, 'interests');
const Game = mongoose.model('Game', gameSchema, 'games');
const Message = mongoose.model('Message', messageSchema, 'messages');
const User = mongoose.model('User', userSchema, 'users');

// Create a user
const addUser = function (username, password, imgPath, phoneNum, email, zip) {
  const newUser = new User({
    name: username,
    password: password,
    img: imgPath,
    phone: phoneNum,
    email: email,
    zip: zip,
  });
  newUser.save((err) => {
    if (err) {
      return handleError(err);
    }
    console.log('user saved');

  });
};

// Create a game
const addGame = function (gameName, type, image,description, street, city, state, zip, creator, date, time) {
  const newGame = new Game({
    gameName, type, image, description, street, city, state, zip, creator, date, time,
  });
  newGame.save((err) => {
    if (err) {
      return handleError(err);
    }
    console.log('event saved');

  });
};

//add message to game
const addMessage = function (user, game, body) {
  let message = new Message({
    user, game, body
  });
  message.save((err) => {
    if (err) {
      return handleError(err);
    }
    console.log('message posted');
  })
}

//create interest
const addInterestToPlayer = function (userName, interest) {
  User.updateOne({ name: userName }, { $push: { interests: interest } }, (err) => {
    if (err) {
      return handleError(err);
    } else {
      console.log('interest added');
    }
  })
};

//Get all games
const getGames=function(callback){
  Game.find({}, (err, games)=>{
    if(err){
      console.error(err)
    } else {
      callback(games)
    }
  })
}

// User can express interest in a game
const addPlayerToGame = function (userName, gameName) {
  console.log(userName);
  Game.updateOne({ name: gameName }, { $push: { players: userName } }, (err) => {
    if (err) {
      return handleError(err);
    } else {
      console.log('player added to game');
    }
  })
  User.updateOne({ name: userName }, { $push: { events: gameName } }, (err) => {
    if (err) {
      return handleError(err);
    } else {
      console.log('game added for player');
     }
  })
    // .then(Game.findOne({ name: gameName }, (err, game) => {
    //   if (err) {
    //     return handleError(err);
    //   } else {
    //     let interest = game.type;
    //     console.log(interest);
    //     addInterestToPlayer(userName, interest);
    //   }
    // }))

};

//Get a player's password
const getPasswordFromUser = function (userName, callback) {
  User.findOne({ name: userName }, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      let password = user.password;
      callback(password);
    }
  })
}

//Find a player if they are involved with a game
const getPlayerFromGame = function (userName, gameName, callback) {
  Game.findOne({ name: gameName }, (err, game) => {
    if (err) {
      console.log(err)
    } else {
      let players = game.players;
      if (players.includes(userName)) {
        callback(userName);
      }
    }
  })
}

//Get game by name
const getGameByName = function (gameName, callback) {
  Game.findOne({ name: gameName }, function (err, game) {
    if (err) {
      return handleError(err);
    } else {
      callback(game);
    }
  })
}

//Get user by name
const getUserByName = function (userName, callback) {
  User.findOne({ name: userName }, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(user);
      callback(user);
    }
  })
}

// Get all events that a user has signed up for
const getGamesForUser = function (userName, callback) {
  User.findOne({ name: userName }, (err, user) => {
    if (err) {
      return handleError(err);
    } else {
      let happenings = user.events;
      callback(happenings)
    }
  })
};

//Get all the messages for a game
const getGameMessages = function (gameName, callback) {
  Message.find({ game: gameName }, (err, messages) => {
    if (err) {
      console.log(err)
    } else {
      callback(messages);
    }
  });
}

//Get games by interest
const getGameByInterest = function(type, callback){
  // console.log('inside helper');
  // console.log(type)
  Game.find({type: type}, (err, game)=>{
    // console.log(game);
    if(err){
      console.error(err);
    }else {
      // console.log(game);
      callback(game);
    }
  })
}

module.exports.addUser = addUser;
module.exports.addGame = addGame;
module.exports.addPlayerToGame = addPlayerToGame;
module.exports.getGameByName = getGameByName;
module.exports.getGamesForUser = getGamesForUser;
module.exports.addInterestToPlayer = addInterestToPlayer;
module.exports.addMessage = addMessage;
module.exports.getGameMessages = getGameMessages;
module.exports.getUserByName = getUserByName;
module.exports.getPlayerFromGame = getPlayerFromGame;
module.exports.getPasswordFromUser = getPasswordFromUser;
module.exports.getGameByInterest = getGameByInterest;
module.exports.getGames = getGames;