const express = require('express');
console.log("api request");
// import modular router for /notes
const notesRouter = require('./notes');

const app = express();

// send any /notes requests to notesRouter
app.use('/notes', notesRouter);

module.exports = app;