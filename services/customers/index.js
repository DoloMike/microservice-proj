require('dotenv').config(); // used to add process.env values that are defined in the .env file at root directory
const { db_user, db_pass, db_url } = process.env;
const connectionStr = `mongodb://${db_user}:${db_pass}@${db_url}`;

const express = require('express');
const app = express();
const routes = require('./routes/customerRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// allow CORS
const cors = require('cors');
app.use(cors());

// initiate mongodb connection and add event listeners
mongoose.connect(connectionStr, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
app.use(bodyParser.json());
app.use('/', routes);
app.listen(process.env.port, () => {
	console.log(`listening at port ${process.env.port}`);
});

module.exports = app; // for testing
