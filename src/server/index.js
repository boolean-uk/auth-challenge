// Load our .env file
require('dotenv').config();

// Import express and cors
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Set up express
const app = express();
app.disable('x-powered-by');
app.use(cors());
// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



const userRouter = require('./routers/user');
app.use('/user', userRouter);

const movieRouter = require('./routers/movie');
app.use('/movie', movieRouter);


// cookies

// app.get('/set-cookies', (req, res) => {

//     // res.setHeader('Set-Cookie', 'newUser=true')
//     // this is the default way

//     res.cookie('newUser', false)

//     res.cookie('isAdmin', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
//     // now maxAge is 24 hours (a comlete day), by default the cookie will expire once u close the browser
//     // however now we can set the cookie to be expired after a day only even if u closed the browser
//     // u can add more props in the this object 
//     // (the maxAge one) like secure : true that will only send cookies to https
//     // or even httpOnly : true to not access cookies from js DOM (document.cookie)
//     // so the client cannot change it

//     res.send('you got a cookie!!')
// })

// app.get('/read-cookies', (req, res) => {

//     // this will return the cookies object
//     const cookies = req.cookies
//     console.log(cookies)
//     res.send(cookies)

// })



// Set up a default "catch all" route to use when someone visits a route
// that we haven't built
app.get('*', (req, res) => {
    res.json({ ok: true });
});

// Start our API server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});