const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
var passport = require('passport');
const User = require('./server/models/user')
const r = require('./server/routes/userRoutes')


const app = express()
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost/manmeet-dev';

// DB connection through Mongoose
const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
mongoose.Promise = global.Promise;
// Don't forget to substitute it with your connection string
mongoose.connect(dbUrl, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Body parser and Morgan middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(passport.initialize());

// We tell express where to find static assets
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api',r)
// API routes
app.get('/', (req, res) => res.sendfile('./client/public/index.html'))

// ...For all the other requests just sends back the Homepage
// app.route("*").get((req, res) => {
//     res.sendFile('client/dist/index.html', { root: __dirname });
// });

// var routes = require('./server/routes/userRoutes'); 
// routes(app); //register the route

// create a user a new user
// var testUser = new User({
//     username: "jmar777",
//     password: 'Password',
//     email: 'sefw@fnjkf.cje'
// });

// // save user to database
// testUser.save(function(err) {
//     if (err) throw err;

// // fetch user and test password verification
// User.findOne({ username: 'jmar777' }, function(err, user) {
//     if (err) throw err;

//     // test a matching password
//     user.comparePassword('Password123', function(err, isMatch) {
//         if (err) throw err;
//         console.log('Password123:', isMatch); // -&gt; Password123: true
//     });

//     // test a failing password
//     user.comparePassword('123Password', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123Password:', isMatch); // -&gt; 123Password: false
//     });
// })
// })

app.listen(port, () => console.log(`listening on port ${port}`))