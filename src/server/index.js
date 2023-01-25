require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.disable('x-powered-by');
app.use(cors());
// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routers/user');
app.use('/user', userRouter);

const movieRouter = require('./routers/movie');
app.use('/movie', movieRouter);

// everything page
app.get('*', (req, res) => {
	res.json({ ok: true });
});

// Start our API server
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`\n Server is running on http://localhost:${port}\n`);
});
