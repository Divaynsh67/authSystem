//IMPORT's
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const webRouter = require("./routes/web")
const authRouter = require("./routes/auth")
const expressLayouts = require("express-ejs-layouts")
const connectDB = require('./app/config/connectDB')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
require("./app/config/passport")(passport)
//PUGLIN's
connectDB()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(session({
    secret: 'metternice1944',
    resave: false,
    saveUninitialized: true,
}))
//PASSPORT, JS

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())




//GLOBAL varibles
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    next()
})

//ROUTE's

app.use("/auth",authRouter)
app.use(webRouter)


//LISTEING's
app.listen(PORT , ()=> console.log(`> Server is running on port : ${PORT}`))



