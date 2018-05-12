const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const router = require('./router')
const cors = require('cors')
const passport = require('passport')
require('./User');
require('./passportService');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/login-with-google');

const app = express()

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// app.use(cors(corsOptions))
app.use(cors())

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser.json({type: '*/*'}))
app.use(
    cookieSession({
        name: 'auth-with-google-session',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ["fewlkjfnj,fnnjknlmfewknfjenwkmbjh"] // some very long string
    })
);
app.use(passport.initialize());
app.use(passport.session());
router(app)

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/client/build/index.html');
    });    
}



const PORT = process.env.PORT || 3030;
app.listen(PORT);
console.log('Server listening on: ', PORT)