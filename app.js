const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const apiRoutes = require('./routes/api-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// set view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
app.use(express.static('public', { "Content-Type": "application/javascript" }));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI)
console.log('connected to db')

// set up routes
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api', apiRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});
// create user ID retrieval route
app.get('/api/user-id', (req, res) => {
    if (req.user) {
        res.send({ userId: req.user.id });
    } else {
        res.status(401).send({ message: 'Not authenticated' });
    }
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
