const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Mock database
const users = [
    { id: 1, username: 'user1', password: '$2a$10$EUN.6p5S1NZ.mEjV1p7UCOw8oCgH/C4aw6Ul44zrM2vefP6hdchva' } // password is 'password'
];

// Passport.js configuration
passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result) return done(null, user);
        return done(null, false, { message: 'Incorrect password.' });
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Routes
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', (req, res) => {
    res.send('Register Page');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);
    res.redirect('/login');
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы
    window.location.href = '/your-new-page'; // Переходим на нужную страницу
});














