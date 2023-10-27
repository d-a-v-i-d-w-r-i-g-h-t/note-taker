const express = require('express');
const path = require('path');

const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// use middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/api', api);


// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// wildcard GET route to direct users to home page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


