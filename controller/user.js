const db = require("../models");
const crypt = require('js-sha512');

const generateKey = () => {
  let sessionID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    sessionID += characters.charAt(Math.floor(Math.random() * 32));
  }
  sessionID = crypt.sha512(sessionID);
  return sessionID;
}

module.exports = {
  register: function(req, res) {
    const { username } = req.body;

    const checkDuplicates = db.User.findOne({ username: username });
    const register = db.User.create(new db.User(req.body));

    checkDuplicates.then(function(response) {
      if(response) {
        res.location("/register");
        res.end();
      } else {
        register.then(function(result) {
          res.location("/login");
          res.end();
        });
      }
    });
  },
  login: function(req, res) {
    const { username, password } = req.body;
    const login = db.User.findOne({ username: username });
    login.then(function(response) {
      if(response.password == password) {
        const sessionTime = 60000; //Default Session: 1 Minute
        const sessionID = generateKey();
        res.cookie("sessionID", sessionID, { httpOnly: true, expires: new Date(Date.now() + sessionTime)}); //Default Session: 1 Minute
        const update = db.User.findOneAndUpdate({ username: username }, { sessionID: sessionID, sessionExpired: false })
        update.then(function(response) {
          setTimeout(function(){
            const destroy = db.User.findOneAndUpdate({ username: username }, { sessionExpired: true });
            destroy.then(function(response) { console.log(`Session for ${response.username} has been deleted!`) });
          }, sessionTime);
          res.location("/bubbles");
          res.end();
        });
      } else {
        //incorrect password
        res.location("/login");
        res.end();
      }
    })
  }
};