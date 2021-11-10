if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const { name } = require('ejs')
const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const app = express()
const passport = require('passport')
const initializePassport = require('./passport-config')
const users = []

initializePassport(
    passport,
    email => users.find(user=>user.email === email),
    id => users.find(user=>user.id === id)
)

app.set('view-engine','ejs')
app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req,res) => {
    res.render('index.ejs')
})

app.get('/login',(req,res) => {
    res.render('login.ejs')
})

app.get('/register',(req,res) => {
    res.render('register.ejs')
})

app.get('/app',(req,res) => {
    res.render('app.ejs',{name : req.user.name})
})

app.post('/register',(req,res)=>{

    var i;
    users.push({
        id: Date.now().toString(),
       name: req.body.name,
       email: req.body.email,
       password: req.body.password
    })
    console.log(users)
    res.redirect('/login')
})

app.post('/login',passport.authenticate('local',{
    successRedirect: '/app',
    failureRedirect: '/login',
    failureFlash : true
}))

app.listen(3000);
